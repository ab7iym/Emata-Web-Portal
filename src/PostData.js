export function PostData(type, userData){

	let BaseUrl = 'https://emata-authservice-test.laboremus.no/users/';

	return new Promise((resolve, reject) =>{
		fetch(BaseUrl+type,{
			headers: {
				'Authorization': '*/*',//'Authorization': 'bearer ${token}',
                'Transfer-Encoding': 'chunked',
                'Content-Type': 'application/json;charset=UTF-8',
                'Content-Encoding': 'gzip',
                'Vary':'Accept-Encoding',
                'X-Content-Type-Options':'nosniff',
			},
			method: 'POST',
			//mode: 'no-cors',
			credentials: 'include',
			body: JSON.stringify(userData)
		})
		.then((response)=>response.json())
		.then((responseJson)=>{
			resolve(responseJson);
		})
		.catch((error)=>{
			reject(error);
		});
	})
}	
