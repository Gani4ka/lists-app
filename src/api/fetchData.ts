const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQHRlc3QuY29tIiwidXNlcklkIjoiNjY4OTM5YmY3NGFkODE0MzE4MTMyZWQ4IiwiaWF0IjoxNzIwMjY5NTEwLCJleHAiOjE3MjExMzM1MTB9.qWJZ-4zUixKo1wBKcDamUlDtjosSKgnLafSmHB6miDg';

export async function getSubcategories() {
  const res = await fetch(`https://nodejs-lists-app.vercel.app/subcategories`, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQHRlc3QuY29tIiwidXNlcklkIjoiNjY4OTM5YmY3NGFkODE0MzE4MTMyZWQ4IiwiaWF0IjoxNzIwMjY5NTEwLCJleHAiOjE3MjExMzM1MTB9.qWJZ-4zUixKo1wBKcDamUlDtjosSKgnLafSmHB6miDg',
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
