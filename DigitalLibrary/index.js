$(function () {
	
	$('#input-data-edition').Zebra_DatePicker();

	const inputNameBook = $('#input-name-book'),
				inputDataEdition = $('#input-data-edition'),
				inputAuthorBook = $('#input-author-book'),
				inputPagesNumber = $('#input-pages-numbers');
	
	let	contextBook = '',
			boonksInLibrary = 0;
	
	localStorage.clear();
	localStorage.setItem('1-edition', '1999-01-11');
	localStorage.setItem('1-pages', '352');
	localStorage.setItem('2-edition', '1975-05-03');
	localStorage.setItem('2-pages', '743');
	localStorage.setItem('3-edition', '1998-07-18');
	localStorage.setItem('3-pages', '297');
	
	boonksInLibrary = localStorage.length / 2;
	
	$('#save-form-btn').on('click', () => {
		renderBook();
	})
	
	function renderBook() {
		const valueName = inputNameBook.val(),
					valueAuthor = inputAuthorBook.val(),
					valueEdition = inputDataEdition.val(),
					valuePages = inputPagesNumber.val(),
					validEdition = /^\d{4}(-\d{2}){2}$/.test(valueEdition),
					validPages = /^\d+$/.test(valuePages);
		
		if (!validEdition || !validPages) {
			if (!validPages) {
				alert('Вы ввели неверные данные в графу: "Количество страниц"');
			}else {
				alert('Вы ввели неверные данные в граффу: "Дата издание"');
			}
			return false
		}
		
		if (contextBook !== '') {
			const idBook = takeId();
			
			contextBook.closest('.book-wrap').find('.name-book p').text(valueName);
			contextBook.closest('.book-wrap').find('.author-book p').text(valueAuthor);
			localStorage.setItem(`${idBook}-edition`, `${valueEdition}`);
			localStorage.setItem(`${idBook}-pages`, `${valuePages}`);
			contextBook = ''
			
		} else {
			boonksInLibrary++;
			
			localStorage.setItem(`${boonksInLibrary}-edition`, `${valueEdition}`);
			localStorage.setItem(`${boonksInLibrary}-pages`, `${valuePages}`);
			
			$('#collection-books > .container > .row').append(`
				<div class="col-12 col-xl-6">
					<div class="book-wrap" id="book-id-${boonksInLibrary}">
						<div class="text-wrap">
							<span class="name-book"><p>${valueName}</p></span>
							<span class="author-book"><h6>Автор книги:</h6><p>${valueAuthor}</p></span>
						</div>
						<div class="buttom-wrap">
							<button type="button" class="btn btn-info editing">Редактирование</button>
							<button type="button" class="btn btn-secondary delete" data-toggle="modal" data-target="#exampleModal">Удаление</button>
						</div>
					</div>
				</div>
			`)
		}
	}
	
	$('#collection-books').on('click', '.editing', function () {
		contextBook = $(this);
		const data = {
			nameBook: contextBook.closest('.book-wrap').find('.name-book p').text(),
			nameAuthor: contextBook.closest('.book-wrap').find('.author-book p').text(),
			idBook: takeId()
		};

		editingBook(data)
	});
	
	function editingBook(data) {
		inputNameBook.val(data.nameBook);
		inputAuthorBook.val(data.nameAuthor);
		inputPagesNumber.val(localStorage.getItem(`${data.idBook}-pages`));
		inputDataEdition.val(localStorage.getItem(`${data.idBook}-edition`));
	}
	
	$('#collection-books').on('click', '.delete', function () {
		contextBook = $(this);
		$('.modal-body').text('Подтвердите удаление книги: ' + contextBook.closest('.book-wrap').find('.name-book p').text())
	});
	
	$('.delete-modal').on('click', function () {
		const idBook = takeId();
		localStorage.removeItem(`${idBook}-pages`);
		localStorage.removeItem(`${idBook}-edition`);
		contextBook.closest('.col-12.col-xl-6').remove();
	});
	
	$('#exampleModal').on('hide.bs.modal', function () {
		contextBook = '';
	});
	
	function takeId() {
		return contextBook.closest('.book-wrap').attr('id').match(/\d+$/)[0]
	}
	
	$('#alphabetSort').on('click', function () {
		sortLibrary('alphabet')
	});
	
	$('#dataEditionSort').on('click', function () {
		sortLibrary('dataEdition')
	});
	
	$('#noySort').on('click', function () {
		sortLibrary('noySort')
	});
	
	function sortLibrary(data) {
		switch (data) {
			case 'alphabet': alphabetSort();
				break;
			case 'dataEdition': dataEditionSort();
				break;
			case 'noySort': noySort();
		}
	}
	
	function alphabetSort() {
		const allAuthor = $('.author-book p'),
					countAuthor = allAuthor.length;
		let arrAuthor = [];
		
		for (let i = 0; i < countAuthor; i++) {
			arrAuthor.push(allAuthor[i].innerHTML)
		}
		arrAuthor.sort();
		
		for (let i = 0; i < countAuthor; i++) {
			$(`.author-book p:contains(${arrAuthor[i]})`).closest('.col-12.col-xl-6').css('order', `${i}`)
		}
	}
	
	function dataEditionSort() {
		let arrDataEdition = [];
		
		for (let i = 1; i <= boonksInLibrary; i++) {
			const dataEdit = localStorage.getItem(`${i}-edition`);
			if (dataEdit !== null) arrDataEdition.push(`${dataEdit} book-id-${i}`)
		}
		arrDataEdition.sort();
		
		for (let i = 0; i < arrDataEdition.length; i++) {
			$(`#${arrDataEdition[i].replace(/.+\s/, '')}`).closest('.col-12.col-xl-6').css('order', `${i}`)
		}
	}
	
	function noySort() {
		$('#collection-books .col-12.col-xl-6').css('order', 0);
	}
	
});