test('Deve retornar token em login válido', async () => {
  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login: 'admin', password: '123456' })
  });

  const data = await res.json();
  const { token } = data;
  
  const responseGetUser = await fetch('http://localhost:3000/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const dadosUsers = await responseGetUser.json();
  console.log(dadosUsers);

  expect(responseGetUser.status).toBe(200);


});