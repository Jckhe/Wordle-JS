export async function getProjects() {
  const url = 'https://wordle-answers-solutions.p.rapidapi.com/today';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '679ada6852msh9a60bc0b28a2d56p1ce433jsn8a4f83964607',
      'X-RapidAPI-Host': 'wordle-answers-solutions.p.rapidapi.com'
    }
  };

  try {
    const res = await fetch(url, options);
    const word = await res.json();
    console.log(word);
    return word;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function validateWord(input: string) {
  const url = `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${input}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '679ada6852msh9a60bc0b28a2d56p1ce433jsn8a4f83964607',
      'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
    }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("Validation Check: ", result);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}