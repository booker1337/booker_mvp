import tokenService from './tokenService';

const authUtil = async (res, setUser, history, username) => {
	if(res.ok) {
		const { token } = await res.json();
		tokenService.setToken(token);

		const payload = JSON.parse(atob(token.split('.')[1]))
		setUser({
			id: payload.id,
			username: payload.username,
		});

		history.push(`/profile/${username}`);
	}
	else {
		const { errors } = await res.json();
		console.log(errors);
	}
};

const signup = (setUser, history) => async (payload) => {
	const res = await fetch('/auth/signup', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	
	authUtil(res, setUser, history, payload.username);
};

const login = (setUser, history) => async (payload) => {
	const res = await fetch('/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	
	authUtil(res, setUser, history, payload.username);
};

const getUser = () => tokenService.getUserFromToken();

const logout = () => tokenService.removeToken();

export default {
	signup, 
  logout,
  login,
	getUser,
};
