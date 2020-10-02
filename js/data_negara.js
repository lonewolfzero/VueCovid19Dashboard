const link = "https://api.kawalcorona.com";
const sembuh = "https://api.kawalcorona.com/sembuh/";
const positif = "https://api.kawalcorona.com/positif/";
const meninggal = "https://api.kawalcorona.com/meninggal/";
const vm = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        url: 'http://covid-19.dioclaude.xyz/apk/PantauCovid_19.apk',
        sembuh: [],
        positif: [],
        meninggal: [],
        search: '',
        headers: [{
                text: 'Negara',
                align: 'start',
                value: 'Country_Region',
            },
            {
                text: 'Positif',
                value: 'Confirmed'
            },
            {
                text: 'Sembuh',
                value: 'Recovered'
            },
            {
                text: 'Meninggal',
                value: 'Deaths'
            },
        ],
        negara: [],
    },
    mounted() {

        axios.get(meninggal).then(response => {
            this.meninggal = response.data.value;
        });
        axios.get(sembuh).then(response => {
            this.sembuh = response.data.value;
        });
        axios.get(positif).then(response => {
            this.positif = response.data.value;
        });
        // axios.get(sembuh).then(response => {
        //     this.sembuh = response.data
        // });
        // axios.get(positif).then(response => {
        //     this.positif = response.data
        // });
        // axios.get(meninggal).then(response => {
        //     this.meninggal = response.data
        // });
        axios.get(link).then(response => {
            for (const val of response.data) {
                this.negara.push(val.attributes);
            }
        });
    },

    methods: {

        forceFileDownload(response) {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Pantau Covid-19.apk') //or any other extension
            document.body.appendChild(link)
            link.click()
        },

        downloadWithAxios() {
            axios({
                    method: 'get',
                    url: this.url,
                    responseType: 'arraybuffer'
                })
                .then(response => {

                    this.forceFileDownload(response)

                })
                .catch(() => console.log('error occured'))
        }
    }

});