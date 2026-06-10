const htmlDecode = (html) => {
	html = html.replaceAll('&amp;', '&');
	// get rid of these in sanitization
	// html = html.replaceAll('&lt;', '<');
	// html = html.replaceAll('&rt;', '>');
	html = html.replaceAll('&quot;', '\"');
	html = html.replaceAll('&#39;', '\'');
	return html;
};

const sanitize = (s) => {
	s = s.replaceAll('&lt;', '');
	s = s.replaceAll('&rt;', '');
	s = s.replaceAll('<', '');
	s = s.replaceAll('>', '');
	s = s.replaceAll('{', '');
	s = s.replaceAll('}', '');
	s = s.replaceAll('[', '');
	s = s.replaceAll(']', '');
	return s;
};

export {
	htmlDecode,
	sanitize
};
