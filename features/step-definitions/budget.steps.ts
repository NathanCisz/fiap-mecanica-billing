import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import assert from 'assert';
import {
  Budget,
  BudgetStatus,
  BudgetItem,
} from '../../src/domain/entities/budget.entity';

let budget: Budget;
let serviceOrderId: string;
let items: BudgetItem[];

Given('que tenho uma ordem de serviço com id {string}', (id: string) => {
  serviceOrderId = id;
});

Given('os itens do orçamento são:', (dataTable: DataTable) => {
  items = dataTable.hashes().map((row) => ({
    description: row.description,
    quantity: Number(row.quantity),
    unitPrice: Number(row.unitPrice),
    totalPrice: Number(row.totalPrice),
  }));
});

When('eu criar o orçamento', () => {
  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
  budget = new Budget({
    id: 'budget-test-id',
    serviceOrderId,
    items,
    totalAmount,
    status: BudgetStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});

Then('o orçamento deve ser criado com status {string}', (status: string) => {
  assert.strictEqual(budget.status, status);
});

Then('o valor total deve ser {int}', (total: number) => {
  assert.strictEqual(budget.totalAmount, total);
});

Given('que existe um orçamento com status {string}', (status: string) => {
  budget = new Budget({
    id: 'budget-test-id',
    serviceOrderId: 'order-123',
    items: [],
    totalAmount: 100,
    status: status as BudgetStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});

When('eu aprovar o orçamento', () => {
  budget.approve();
});

When('eu rejeitar o orçamento', () => {
  budget.reject();
});

Then('o status do orçamento deve ser {string}', (status: string) => {
  assert.strictEqual(budget.status, status);
});
