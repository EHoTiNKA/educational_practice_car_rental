import { test, expect } from '@playwright/test';

test.describe('Тесты фильтрации автомобилей', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForSelector('[data-testid="car-card"]');
  });

  test('Фильтрация по типу автомобиля', async ({ page }) => {
    // Используем видимый элемент для взаимодействия

    const carCheckedType = "Седан"

    const sedanLabel = page.locator(`[data-testid="checkbox-${carCheckedType}"] .custom-checkbox`);
    
    // Проверяем состояние через скрытый input
    const sedanCheckbox = page.locator('[data-testid="checkbox-input-Седан"]');

    // Ждем полной загрузки фильтров
    await expect(sedanLabel).toBeVisible();

    // Проверяем начальное состояние
    await expect(sedanCheckbox).not.toBeChecked();

    // Кликаем по видимой части чекбокса
    await sedanLabel.click();

    await expect(sedanCheckbox).toBeChecked();
    
    // Ждем применения фильтров
    await page.waitForFunction(() => {
      return document.querySelectorAll('[data-testid="car-card"]').length > 0;
    });

    // Проверяем отфильтрованные результаты
    const carTypes = await page.locator('[data-testid="car-type"]').allTextContents();
    for (const type of carTypes) {
      expect(type).toBe(carCheckedType);
    }
  });
});