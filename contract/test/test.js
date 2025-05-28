const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EmployeePayment", () => {
    let owner, manager, emp1, emp2, contract, task, createdTask;

    beforeEach(async () => {
        [owner, emp1, emp2] = await ethers.getSigners()
        const contractFactory = await ethers.getContractFactory("EmployeePayment");
        contract = await contractFactory.deploy();
        await contract.waitForDeployment();
    });
    const work = "New task created";
    const employee1 = emp1.address;
    const amount = ethers.parseEther("0.01");

    it("Should allow the owner to create tasks", async () => {
        await contract.createdTask(work, employee1, amount);
        task = await contract.tasks(0);
        expect(task.description).to.equal(work);
        expect(task.employee).to.equal(employee1);
        expect(task.amount).to.equal(amount);
    });

    it("Should allow the assigned employee to perform the task", async () => {
        await contract.createdTask(work, employee1, amount);
        const workerConnected = await contract.connect(emp1);
        const tx = await contract.employeeToDoTask(0);
        await tx.wait();
        const completedTask = await workerConnected.completed(0);
        expect(completedTask.isComplete).to.be.true;
    })

    it("Should allow either the manager or the owner to verify the work", async () => {
        const createdTask = await contract.createdTask(work, employee1, amount);
        await createdTask.wait();
        task = await contract.tasks(0);
        expect(task.isChecked).to.be.true;
    });

    it("Should allow the ownerto fund the employee for task completeion", async () => {
        const createdTask = await contract.createdTask(work, employee1, amount);
        await createdTask.wait();
        const paymentFn = await contract.fundEmployeeForTaskCompletion(0, amount);
        await paymentFn.wait();
        task = await contract.tasks(0);
    })
})
