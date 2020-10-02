const link = "https://api.kawalcorona.com";
const provinsi = "https://api.kawalcorona.com/indonesia/provinsi/";
const sembuh = "https://api.kawalcorona.com/sembuh/";
const positif = "https://api.kawalcorona.com/positif/";
const meninggal = "https://api.kawalcorona.com/meninggal/";
const vm = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        url: 'http://covid-19.dioclaude.xyz/apk/PantauCovid_19.apk',
        link: [],
        selected: '',
        c_provinsi: [],
        error_modal: '',
        indo_sembuh: [],
        indo_positif: [],
        item_provinsi: [],
        indo_meninggal: [],
        search: '',
        headers: [{
                text: 'Provinsi',
                align: 'start',
                value: 'Provinsi',
            },
            {
                text: 'Positif',
                value: 'Kasus_Posi'
            },
            {
                text: 'Sembuh',
                value: 'Kasus_Semb'
            },
            {
                text: 'Meninggal',
                value: 'Kasus_Meni'
            },
        ],
        provinsi: [],
    },
    mounted() {
        axios.get(link).then(response => {
            for (const val of response.data) {
                if (val.attributes.Country_Region == 'Indonesia') {
                    this.indo_sembuh = new Intl.NumberFormat('de-DE').format(val.attributes.Recovered);
                    this.indo_positif = new Intl.NumberFormat('de-DE').format(val.attributes.Confirmed);
                    this.indo_meninggal = new Intl.NumberFormat('de-DE').format(val.attributes.Deaths);
                }
            }
        });
        axios.get(provinsi).then(response => {
            for (const val of response.data) {
                this.provinsi.push(val.attributes);
                this.item_provinsi.push(val.attributes);
            }
            var c_FID = getCookie('covid19Provinsi');
            if (c_FID != "") {
                for (const val of response.data) {
                    if (val.attributes.FID == c_FID) {
                        this.c_provinsi.push(val.attributes);
                    }
                }
            }
        });
    },
    methods: {
        getCookie: function (cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        setProvinsi: function () {
            var provinsi = this.selected;
            if (provinsi == '') {
                this.error_modal = "Pilih provinsi terlebih dulu !";
            } else {
                cname = 'covid19Provinsi';
                exdays = 3; //3 tahun expired
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000 * 365));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + provinsi + ";" + expires + ";path=/";
                document.location.href = "";
            }
        },
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