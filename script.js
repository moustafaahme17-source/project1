let title = document.getElementById('title');
let price = document.getElementById('price');
let texes = document.getElementById('texes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let tolal = document.getElementById('tolal');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

// حساب المجموع تلقائياً
function getTotal() {
    if (price.value != '') {
        let result = (Number(price.value) + Number(texes.value) + Number(ads.value)) - Number(discount.value);
        tolal.innerHTML = result;
        tolal.style.background = '#040';
    } else {
        tolal.innerHTML = '';
        tolal.style.background = 'red';
    }
}

// تفعيل الأحداث لكل الحقول المؤثرة على المجموع
price.onkeyup = function() { getTotal(); }
texes.onkeyup = function() { getTotal(); }
ads.onkeyup = function() { getTotal(); }
discount.onkeyup = function() { getTotal(); }

let datepro;
if (localStorage.product != null) {
    datepro = JSON.parse(localStorage.product);
} else {
    datepro = [];
}

// زر الإضافة / التعديل
submit.onclick = function() {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        texes: texes.value,
        ads: ads.value,
        discount: discount.value,
        tolal: tolal.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (title.value != '' && price.value != '' && category.value != '' && newpro.count <= 100) {
        if (mood === 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datepro.push(newpro);
                }
            } else {
                datepro.push(newpro);
            }
        } else {
            datepro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'creete'; // نفس الكلمة الموجودة في HTML لديك
            count.style.display = 'block';
        }
        clealDate();
    }

    localStorage.setItem('product', JSON.stringify(datepro));
    showdate();
}

// تنظيف الحقول
function clealDate() {
    title.value = '';
    price.value = '';
    texes.value = '';
    ads.value = '';
    discount.value = '';
    tolal.innerHTML = '';
    count.value = '';
    category.value = '';
    tolal.style.background = 'red';
}

// عرض البيانات في الجدول
function showdate() {
    getTotal();
    let table = '';
    for (let i = 0; i < datepro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datepro[i].title}</td>
            <td>${datepro[i].price}</td>
            <td>${datepro[i].texes}</td>
            <td>${datepro[i].ads}</td>
            <td>${datepro[i].discount}</td>
            <td>${datepro[i].tolal}</td>
            <td>${datepro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
    }
    
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (datepro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${datepro.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
}

showdate();

// حذف عنصر واحد
function deleteData(i) {
    datepro.splice(i, 1);
    localStorage.product = JSON.stringify(datepro);
    showdate();
}

// حذف كل المنتجات
function deleteAll() {
    localStorage.removeItem('product');
    datepro = [];
    showdate();
}

// تعديل بيانات منتج
function updateData(i) {
    title.value = datepro[i].title;
    price.value = datepro[i].price;
    texes.value = datepro[i].texes;
    ads.value = datepro[i].ads;
    discount.value = datepro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = datepro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    });
}


let searchMood = 'title'; 

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchtitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    } else {
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus();
    search.value = '';
    showdate();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < datepro.length; i++) {
        if (searchMood == 'title') {
            if (datepro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${datepro[i].title}</td>
                    <td>${datepro[i].price}</td>
                    <td>${datepro[i].texes}</td>
                    <td>${datepro[i].ads}</td>
                    <td>${datepro[i].discount}</td>
                    <td>${datepro[i].tolal}</td>
                    <td>${datepro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }
        } else {
            if (datepro[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${datepro[i].title}</td>
                    <td>${datepro[i].price}</td>
                    <td>${datepro[i].texes}</td>
                    <td>${datepro[i].ads}</td>
                    <td>${datepro[i].discount}</td>
                    <td>${datepro[i].tolal}</td>
                    <td>${datepro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}