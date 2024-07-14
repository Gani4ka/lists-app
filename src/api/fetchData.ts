const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFubmFAdGVzdC5jb20iLCJ1c2VySWQiOiI2NjkwNTY2YjY0Zjg0MDY4ZTQ3MmQ4ZjYiLCJpYXQiOjE3MjA3NjU2MzQsImV4cCI6MTcyMTYyOTYzNH0.F8Wes4iYOlF5K1Iv7kR6vmaviP-3VHp-8Hrrz007WjA';

export async function getSubcategories() {
  const res = await fetch(`https://nodejs-lists-app.vercel.app/subcategories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`https://nodejs-lists-app.vercel.app/categories`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: 'application/json',
    },
  });
  return res.json();
}

export async function makeCategoriesReqWithErrCatch() {
  try {
    return await getCategories();
  } catch (e) {
    console.log('error', e); // no error
  }
}

// {
//   "email":"anna@test.com",
//   "password":"hellothere"
// }
