export class LocalStorage {
	static setIni(iniText) {
		localStorage.setItem("ini", iniText);
	}
	static getIni(){
		return localStorage.getItem("ini");
	}
}