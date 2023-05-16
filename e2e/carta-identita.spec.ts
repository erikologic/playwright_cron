import { test, expect } from '@playwright/test';
import { setTimeout } from 'timers/promises';

const delay = 10_000;

test('carta identita e chiuso', async ({ page }) => {
	await page.goto('https://prenotami.esteri.it/Home?ReturnUrl=%2fServices');
	await page.getByLabel('Email').click();
	await page.getByLabel('Email').fill(process.env.CONS_EMAIL!);
	await setTimeout(delay);
	await page.getByLabel('Password').click();
	await page.getByLabel('Password').fill(process.env.CONS_PW!);
	await setTimeout(delay);
	await page.getByRole('button', { name: 'Avanti' }).click();
	await setTimeout(delay);
	await page
		.getByRole('row', {
			name: "DOCUMENTI DI IDENTITA’/VIAGGIO Carta d’identità Carta d'Identità elettronica Prenota  Link 1",
		})
		.getByRole('button', { name: 'Prenota' })
		.click();
	await setTimeout(delay * 3);
	await expect(
		page.getByText(
			'Al momento non ci sono date disponibili per il servizio richiesto',
		),
	).toBeVisible();
});
