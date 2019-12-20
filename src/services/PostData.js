export function PostData(drawData) {
  let BaseURL = "http://localhost:81/react-php/api/inthedraw.php";

  return new Promise((resolve, reject) => {
    fetch(BaseURL, {
      body: JSON.stringify(drawData)
    })
      .then(response =>
        response.json().then(res => {
          resolve(res);
        })
      )
      .catch(error => {
        reject(error);
      });
  });
}
