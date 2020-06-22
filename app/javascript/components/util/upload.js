import $ from 'jquery';

const saveUploads = (attributes, callback) => {
	if (attributes.location && attributes.image_location && (attributes.reboundTrackId ? true : attributes.name)) {
		const requestObj3 = {
			method: 'POST',
			url: '/s3_blob_location',
			data: attributes
		};

		$.ajax(requestObj3).then(callback);
	}
};

const upload = (file, image, attributes, callback) => {
	const requestObj = {
		method: 'GET',
		url: '/s3_direct_post'
	};

	// file upload
	$.ajax(
		Object.assign({}, requestObj, {
			data: Object.assign({}, attributes, {
				newPhotoName: undefined
			})
		})
	).then((data) => {
		let fd = new FormData();
		_.each(data.fields, (value, key) => {
			fd.append(key, value);
		});

		fd.append('file', file);

		const requestObj2 = {
			method: 'POST',
			url: data.url,
			data: fd,
			processData: false,
			contentType: false
		};

		$.ajax(requestObj2).then((data2) => {
			console.log(data2);
			const data2$ = $(data2);
			attributes.location = data2$.find('PostResponse').find('Location').text();
			saveUploads(attributes, callback);
		});
	});

	// image upload
	$.ajax(
		Object.assign({}, requestObj, {
			data: Object.assign({}, attributes, {
				newTrackName: undefined
			})
		})
	).then((data) => {
		console.log(data);
		let fd = new FormData();
		_.each(data.fields, (value, key) => {
			fd.append(key, value);
		});

		fd.append('file', image);

		const requestObj2 = {
			method: 'POST',
			url: data.url,
			data: fd,
			processData: false,
			contentType: false
		};

		$.ajax(requestObj2).then((data2) => {
			console.log(data2);
			const data2$ = $(data2);
			attributes.image_location = data2$.find('PostResponse').find('Location').text();
			saveUploads(attributes, callback);
		});
	});
};

export default upload;
