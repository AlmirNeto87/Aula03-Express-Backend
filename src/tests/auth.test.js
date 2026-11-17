test('Deve retornar token em login válido', async () => {
  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login: 'admin', password: '123456' })
  });

  const data = await res.json();
  expect(res.status).toBe(200);
  expect(data.token).toBeDefined(); // O token não pode ser nulo
});