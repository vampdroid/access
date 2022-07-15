import React, { useState } from 'react'
import { Web3Storage } from 'web3.storage'



function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
}

function getAccessToken () {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA0NzEwYjE4MEIzZUZiOTM5NzRiMGIyMjcyQjY2ODhiMTI5ZmEzNkEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTI1NTExODUzNjcsIm5hbWUiOiJNeVRva2VuIn0.Bhq9EA7lbquUNx-4nldcFc_YsRhTSGF358-1wMisANk'
//   return process.env.WEB3STORAGE_TOKEN
}
export async function postOnIPFS(name,value){
    //  e.preventDefault();
    console.log("Inside Function")
    var file = makeFileObjects(value,name);
    var cid = await storeFiles(file)
    return cid;
    //localStorage.setItem('name',cid)
    //console.log(retrieveFiles(cid));
    }

async function storeFiles (files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    console.log(cid);
    return cid
    }
function makeFileObjects (value,name) {
    // const obj = { hello: 'world' }
    // const blob = new Blob([JSON.stringify(content)], { type: 'application/json' })
    const file = [
        new File([value], 'name.txt')
        // new File([blob], 'hello.json')
    ]
    return file
}

export async function retrieveFiles (cid) {
   
    const client = makeStorageClient()
    const res = await client.get(cid)
    console.log(`Got a response! [${res.status}] ${res.statusText}`)
    if (!res.ok) {
      throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
    }
    const files = await res.files()
    const formData = new FormData();
    formData.append('file',files[0]);
    let data = await fetch('http://localhost:5000/ipfs/get-file-data',{
        method:'POST',
        body:
            formData
      })
    let result = await data.json();
    console.log(result)
    return result;
//     console.log(files)
//     for (const file of files) {
//       console.log(`${file.cid} -- ${file.name} -- ${file.size}`)
//       var reader = new FileReader();
//       reader.onload = function() {
//         alert()
//       }
//     reader.readAsText(files);
//     }
//     console.log(content);
//    return content[id];
  }

// function getText(cid){
//     // read text from URL location
//     var request = new XMLHttpRequest();
//     request.open('GET', `https://api.web3.storage/car/${cid}`, true);
//     request.send(null);
//     request.onreadystatechange = function () {
//         if (request.readyState === 4 && request.status === 200) {
//             var type = request.getResponseHeader(/*'Access-Control-Expose-Headers: application/vnd.ipld.car'*/);
//             if (type.indexOf("text") !== 1) {
//                 console.log(request.responseText)
//             }
//         }
//     }
// }
export async function readData(cid){
    const client = makeStorageClient()
    const file = await client.get(cid).files
    var reader = new FileReader();

    let data="";
    reader.onload = function(){
        data = reader.result;
    }
    reader.readAsText(file[0]);
    console.log("from ipfs"+data)
    return data;
}

