const API_URL = 'http://localhost:4444';

export async function getJobs(){
    const responseJson = await fetch(`${API_URL}/jobs`);
    const response = await responseJson.json();
    return response
}

export async function getJobById(id){
    const responseJson = await fetch(`${API_URL}/jobs/${id}`);
    const response = await responseJson.json();
    return response
}

export async function postNewJob(job){
    const responseJson = await fetch(`${API_URL}/jobs`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
    })
    const response = await responseJson.json();
    return response;
}

export async function putEditJob(job){
    const responseJson = await fetch(`${API_URL}/jobs/${job.id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
    });
    const response = await responseJson.json();
    return response;
};

export async function deleteJob(id){
    return fetch(`${API_URL}/books/${id}`,{
        method: 'DELETE'
    });
}