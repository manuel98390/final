class UserModel {
    #IdDispositivo;
    #Macaddres;
    #serviceuuids;
    #caracteristica;
    #data = [];
    #Experimentoname;

    constructor(IdDispositivo, Macaddres, serviceuuids, caracteristica, Experimentoname) {
        this.#IdDispositivo = IdDispositivo;
        this.#Macaddres = Macaddres;
        this.#serviceuuids = serviceuuids;
        this.#caracteristica = caracteristica;
        this.#Experimentoname = Experimentoname;
    }

    setIdDispositivo(IdDispositivo) {
        this.#IdDispositivo = IdDispositivo;
    }
    getIdDispositivo() {
        return this.#IdDispositivo
    }

    setMacaddres(Macaddres) {
        this.#Macaddres = Macaddres;
    }
    getMacaddres() {
        return this.#Macaddres
    }

    setserviceuuids(serviceuuids) {
        this.#serviceuuids = serviceuuids;
    }
    getserviceuuids() {
        return this.#serviceuuids
    }

    setcaracteristica(caracteristica) {
        this.#caracteristica = caracteristica;
    }
    getcaracteristica() {
        return this.#caracteristica
    }
    setdata(data) {
        if (data.length === 0) {
            this.data = []
        } else {
            this.data.push(data);
        }
    }
    setExperimentoname(Experimentoname) {
        this.Experimentoname = Experimentoname;
    }
}
export default UserModel;