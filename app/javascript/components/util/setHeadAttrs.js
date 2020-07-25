import $ from 'jquery';

export default (title) => {
	$('head title').text(title);
};
