async function fetchStates() {
  try {
    const res = await fetch(
      'https://countriesnow.space/api/v0.1/countries/states',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: 'Nigeria',
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    return data.data.states.map((state: any) => state.name);
  } catch (error) {
    console.log(error);
    return [];
  }
}
export default fetchStates;
