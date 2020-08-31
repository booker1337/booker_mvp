import tokenService from './tokenService';
const getLocalUser = () => tokenService.getUserFromToken();

const authUtil = async (res, setUser, history) => {
	if(res.ok) {
		const { token } = await res.json();
		tokenService.setToken(token);

		const id = getLocalUser();
		setUser(id);

		history.push(`/profile`);
	}
	else {
		const { errors } = await res.json();
		console.log(errors);
	}
};

const getSignup = (setUser, history) => async (payload) => {
	const res = await fetch('/api/auth/signup', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	
	authUtil(res, setUser, history);
};

const getLogin = (setUser, history) => async (payload) => {
	const res = await fetch('/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	
	authUtil(res, setUser, history);
};

const getLogout = (setUser) => () => {
	tokenService.removeToken();
	setUser(undefined);
};

export default {
	getLocalUser,
	getSignup, 
  getLogout,
  getLogin,
};
