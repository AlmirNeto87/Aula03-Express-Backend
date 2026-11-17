test('O servidor deve responder na porta 3000', async () => {
  const response = await fetch('http://localhost:3000');
  // Verifica se o status é 200
  expect(response.status).toBe(200);
});