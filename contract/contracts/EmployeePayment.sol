//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
contract EmployeePayment is AutomationCompatible {

     // task state
    struct Task{
        uint256 taskId;
        string description;
        address employee;
        uint256 amount;
        bool isCompleted;
        bool isFunded;
        bool isChecked;
        bool isPaid; // ✅ New field to track auto payments

    }
    uint256 public newTaskId;
    Task[] public tasks;
    // Task[] public employeesTasks;
    mapping(address => uint256[]) private employeeToTaskIds;
    mapping(uint256 => Task) public completed;
    uint256 public numOfEmployeeTasks;
    //employee state
    struct Employee{
        uint256 employeeId;
        address employeeAddress;
        uint256 employeeBalances;
    }

    Employee[] public employeeList;
    mapping(address => Employee) employees;
    address public employeeLeader;

    address public owner;
    uint256 public contractBalance;
    uint256 public amountAvailableForExpenditure;
    // ✅ New: Automation config
    uint256 public autoPayInterval = 1 days;
    uint256 public lastAutoPayTime;
    //events
    event TaskCreated(uint256 indexed taskId, address indexed employee, uint256 amount, string description);
    event TaskCompleted(uint256 indexed taskId, address indexed employee);
    event TaskVerified(uint256 indexed taskId, address verifier);
    event EmployeeFunded(uint256 indexed taskId, address indexed employee, uint amount);
constructor(){
    owner = msg.sender;
     lastAutoPayTime = block.timestamp; // ✅ Initialize lastAutoPayTime
}
modifier onlyOwner(){
    require(msg.sender == owner, "You're not the owner");
    _;
}
modifier onlyAssignedEmployee(uint256 taskId){
    require(taskId < tasks.length, "Invalid task id");
    require(tasks[taskId].employee == msg.sender, "You're not assigned to this task");
    require(!tasks[taskId].isCompleted, "Task is complete");
    _;
}
// owner sets the leader to perform payment tasks
function setEmployeeLeader(address _leader) external onlyOwner(){
    employeeLeader = _leader;
}
modifier onlyOwnerOrEmployeeLeader(){
    require(msg.sender == owner || msg.sender == employeeLeader, "You're not authorized");
    _;
}

//create task by the employer & assigns the employee
function createTask(string memory _description, address _employee, uint256 _amount) external onlyOwner(){
    Task memory newTask = Task({
        taskId: newTaskId, description: _description, employee: _employee,
        amount: _amount, isCompleted: false, isFunded: false, isChecked: false, isPaid: false});
    tasks.push(newTask);
    employeeToTaskIds[_employee].push(newTaskId);

    bool isFound = false;
    for(uint i = 0; i < employeeList.length; i++){
        if(employeeList[i].employeeAddress == _employee){
            employeeList[i].employeeBalances += _amount;
            // employeesTasks.push(newTask);
            numOfEmployeeTasks ++;
            isFound = true;
            break;
        }
    }
    if(!isFound){
        employeeList.push(Employee({
        employeeId: newTaskId, employeeAddress: _employee, employeeBalances: _amount}));
    }
    emit TaskCreated(newTaskId, _employee, _amount, _description);
    newTaskId ++;
}

//employee acknowledges and does the task
function employeeToDoTask(uint256 taskId) external onlyAssignedEmployee(taskId) {
   Task storage newTask = tasks[taskId];
   newTask.isCompleted = true;
   completed[taskId] = newTask;
   emit TaskCompleted(taskId, msg.sender);
}

// leader verifies that the task is done
function verificationOfEmployeeTaskCompletion(uint256 _taskId) external onlyOwnerOrEmployeeLeader(){
    require(tasks[_taskId].isCompleted, "Task not yet completed");
    require(!tasks[_taskId].isChecked, "Task not completed!");

    tasks[_taskId].isChecked = true;
    emit TaskVerified(_taskId, msg.sender);
}
//fundTask by the employer
function fundEmployeeForTaskCompletion( uint256 taskId, uint256 _amount) external payable onlyOwner(){
    require(taskId < tasks.length, "Invalid task id");
    Task storage task = tasks[taskId];
    require(task.isCompleted, "Task not completed yet");
    require(task.isChecked, "Task not checked");
    require(!task.isFunded, "Task already funded");
    require(msg.value == _amount, "Invalid amount");



    address empAddress = tasks[taskId].employee;
    bool isFound = false;
    for(uint i = 0; i < employeeList.length; i++){
        if(employeeList[i].employeeAddress == empAddress){
            employeeList[i].employeeBalances += _amount;
            isFound = true;
        }
    }
    require(isFound, "Employee not found");
    tasks[taskId].isFunded = true;
    payable(empAddress).transfer(_amount);
    emit EmployeeFunded(taskId, empAddress, _amount);
}

//returning all tasks
function getAllTasks() external view returns(
    uint256[] memory _ids, string[] memory _descriptions, address[] memory _employees, uint256[] memory _amounts,
     bool[] memory _completes, bool[] memory _funded, bool[] memory _checked, bool[] memory _isPaid ){
        uint256 quantity = tasks.length;
        // initializing each array with the length of the parent
        _ids = new uint256[](quantity);
        _descriptions = new string[](quantity);
        _employees = new address[](quantity);
        _amounts = new uint256[](quantity);
        _completes = new bool[](quantity);
        _funded = new bool[](quantity);
        _checked = new bool[](quantity);
        _isPaid = new bool[](quantity);

        for(uint256 i = 0; i < quantity; i++){
            // pull out the full struct
            Task memory task = tasks[i];
            //populate each returned arrays by by extracting struct fields
            _ids[i] = task.taskId;
            _descriptions[i] = task.description;
            _employees[i]= task.employee;
            _amounts[i] = task.amount;
            _completes[i] = task.isCompleted;
            _funded[i] = task.isFunded;
            _checked[i] = task.isChecked;
            _isPaid[i] = task.isPaid;
        }
    return (_ids, _descriptions, _employees, _amounts, _completes, _funded, _checked, _isPaid);
}

//returning tasks of a specific employee
function getAllEmployeeTasks() external view returns(
    uint256[] memory _ids, string[] memory _descriptions, address[] memory _employees, uint256[] memory _amounts,
     bool[] memory _completes, bool[] memory _funded, bool[] memory _checked, bool[] memory _isPaid ) {

    uint256[] memory taskIds = employeeToTaskIds[msg.sender];
    uint256 quantity = taskIds.length;

    _ids = new uint256[](quantity);
    _descriptions = new string[](quantity);
    _employees = new address[](quantity);
    _amounts = new uint256[](quantity);
    _completes = new bool[](quantity);
    _funded = new bool[](quantity);
    _checked = new bool[](quantity);
    _isPaid = new bool[](quantity);

    for (uint256 i = 0; i < quantity; i++) {
        Task memory task = tasks[taskIds[i]];
        _ids[i] = task.taskId;
        _descriptions[i] = task.description;
        _employees[i] = task.employee;
        _amounts[i] = task.amount;
        _completes[i] = task.isCompleted;
        _funded[i] = task.isFunded;
        _checked[i] = task.isChecked;
        _isPaid[i] = task.isPaid;
    }

    return (_ids, _descriptions, _employees, _amounts, _completes, _funded, _checked, _isPaid);
}

function getAllEmployees() external view returns(
    uint256[] memory ids, address[] memory addresses, uint256[] memory balances){
        uint256 len = employeeList.length;
        // initialize each array with the len
        ids = new uint256[](len);
        addresses = new address[](len);
        balances = new uint256[](len);
        for(uint256 i = 0; i < len; i++){
            // pull out the full employee struct
            Employee memory emp = employeeList[i];
            // Populate each of the return arrays by extracting struct fields
            ids[i] = emp.employeeId;
            addresses[i] = emp.employeeAddress;
            balances[i] = emp.employeeBalances;
        }
    return (ids, addresses, balances);
}

// ✅ Allow employer to fund the contract
    receive() external payable {}

    // ======== ✅ CHAINLINK AUTOMATION HOOKS ========
     function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory) {
    if (block.timestamp - lastAutoPayTime >= autoPayInterval) {
        for (uint256 i = 0; i < tasks.length; i++) {
            Task memory task = tasks[i];
            if (task.isCompleted && !task.isPaid && address(this).balance >= task.amount) {
                return (true, "");
            }
        }
    }
    return (false, "");
}

function performUpkeep(bytes calldata) external override {
    require(block.timestamp - lastAutoPayTime >= autoPayInterval, "Too soon");
    lastAutoPayTime = block.timestamp;

    for (uint256 i = 0; i < tasks.length; i++) {
        Task storage task = tasks[i];
        if (task.isCompleted && !task.isPaid && address(this).balance >= task.amount) {
            task.isPaid = true;
            payable(task.employee).transfer(task.amount);
        }
    }
}

}
