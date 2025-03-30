class Constants {
	static get EMAIL_REGEXP() {
		return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	}

	static get PASSWORD_REGEXP() {
		return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
	}

	static get PASSWORD_MIN_LENGTH() {
		return 3;
	}

	static get FULL_NAME_REGEXP() {
		return /^[a-zA-Zàáảãạäèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựàáảãạäèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựđ\s]+$/;
	}
}

export default Constants;
