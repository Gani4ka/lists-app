export async function getSubcategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}subcategories`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  });
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}categories`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
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
