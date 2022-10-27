import axios from 'axios';

async function get(url) {
    await axios.get(url)
    .then(res => {
        return res
    })
}

export default get