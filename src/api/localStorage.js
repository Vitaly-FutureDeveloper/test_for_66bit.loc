export class LocalStorage {
	static setINI(iniText) {
		localStorage.setItem("ini", iniText);
	}
	static getINI() {
		return localStorage.getItem("ini");
	}
}