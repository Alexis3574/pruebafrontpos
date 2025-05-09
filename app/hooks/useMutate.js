export async function postData(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }
  
  export async function putData(url, data) {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }
  
  export async function deleteData(url) {
    const res = await fetch(url, {
      method: 'DELETE'
    });
    return res.json();
  }
  