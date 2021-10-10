const gurl = 'http://localhost:3000/'
let urls = document.location.href.split("/")


function URL() {
 	let url = document.location.href.replace(document.location.origin, '')
    if(url==="/") url = 'index.html'
	console.log(url)
	
	return url
}
async function send(url, data, metod) {
    let response

    if(metod==="GET"){
        response = await fetch(gurl + url, {
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
    else response = await fetch(gurl + url, {
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

    return await response.text();
}
function fileLoader(files, clb) {
  let file = files[0]
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