export function fileLoader(file, clb) {
  console.log(file.name)
  
  let img = document.createElement("img")
  img.classList.add("obj")
  img.file = file
  let reader = new FileReader()
  
  reader.onload = ((aImg)=> { 
      return(e)=> { 
          aImg.src = e.target.result

          clb(aImg.src)
      }
  })(img)

  reader.readAsDataURL(file)
}




export function sends(url, data, metod, clb) {
    let response;

    if(metod==="GET"){
        response = fetch(window.gurl + url, {
            method: "GET",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer'
        });
    }
    else response = fetch(gurl + url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    response.then((data)=> data.json().then((val)=> clb(val)))
}
export const useSend =(path, data, clb)=> {
  sends(path, data, "POST", clb)
}