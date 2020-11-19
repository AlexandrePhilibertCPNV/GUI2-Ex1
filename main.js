let IconMixin = {
    methods: {
        getClass(vehicule) {
            switch (vehicule.cat) {
                case 'velo':
                    return [
                        'fa-bicycle',
                        'my-green'
                    ];
                case 'van':
                    return [
                        'fa-bus',
                        'my-red',
                    ];
                case 'moto':
                    return [
                        'fa-motorcycle',
                        'my-darkblue',
                    ];
                case 'voiture':
                default:
                    return [
                        'fa-car',
                        'my-orange',
                    ];
            }
        },
    },
}

Vue.component('liste-vehicules', {
    props: ['vehicules'],
    mixins: [IconMixin],
    methods: {
        change(vehicule) {
            // We need to emit the event to the parent scope, otherwise the 
            // event will not be received by the parent element.
            this.$parent.$emit("changeValeur", vehicule);
        }
    },
    template: `
        <ul>
            <li v-for="vehicule in vehicules" class="men-itm" @click="change(vehicule)">
                <i class="fa" :class="getClass(vehicule)" aria-hidden="true"></i>
                {{vehicule.titre}}</li>
        </ul>
    `,
});

Vue.component('detail-vehicule', {
    props: ['vehicule'],
    mixins: [IconMixin],
    template: `
        <div>
            <div class="animdroite" id="titre">{{vehicule.titre}}</div>
            <div class="animdroite" id="introduction">{{vehicule.introduction}}</div>
            <div class="animdroite" id="image">
                <img :src="vehicule.image" width="400px">
                <i class="fa" :class="getClass(vehicule)" aria-hidden="true"></i>
            </div>
            <div class="animdroite" id="description">{{vehicule.description}}</div>
            <button  class="animdroite" id="reserver">RESERVER</button>
        </div>
    `,
});

new Vue({
    el: '#container',
    data: {
        vehicules: [],
        selectedVehicule: null,
    },
    methods: {
        fetchdata() {
            this.vehicules = vehicules;
            this.selectedVehicule = this.vehicules[0];
        },
        changeValeurs(id) {
            this.selectedVehicule = this.vehicules.find(v => v.id == id);
            console.log('testset');
        },
    },
    beforeMount() {
        this.fetchdata();
    },
    mounted() {
        this.$on('changeValeur', v => this.changeValeurs(v.id));
    },
});
