class Contact{
    constructor(id, name, avatar, mobile, email){
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.mobile = mobile;
        this.email = email;
    }
}

const contact_key = "data-contact";
const avatar_url = 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar';
var contacts = []

function init(){
    if(localStorage.getItem(contact_key) == null){
        contacts = [
            new Contact(1, "Dũng", `${avatar_url}/1.jpg`, '0935123123', 'dung@gmail.com'),
            new Contact(2, "Cường", `${avatar_url}/2.jpg`, '0935123123', 'cuong@gmail.com'),
            new Contact(3, "Luyn", `${avatar_url}/3.jpg`, '0935123123', 'luyn@gmail.com'),
            new Contact(4, "Hoan", `${avatar_url}/4.jpg`, '0935123123', 'hoan@gmail.com'),
            new Contact(5, "Lợi", `${avatar_url}/5.jpg`, '0935123123', 'loi@gmail.com'),
            new Contact(6, "Duy", `${avatar_url}/6.jpg`, '0935123123', 'dung@gmail.com')
        ];

        localStorage.setItem(contact_key, JSON.stringify(contacts));
    }
    else{
        contacts = JSON.parse(localStorage.getItem(contact_key));
    }
}

function renderContact(){
    let htmls = contacts.map(function(contact, index){
        return `
            <tr>
                <td class="text-center">
                    <input type="checkbox">
                </td>
                <td>${contact.name}</td>
                <td class="text-center">
                    <img class="avatar-sm" src="${contact.avatar}" alt="">
                </td>
                <td class="text-center">
                    ${contact.mobile}
                </td>
                <td>
                    ${contact.email}
                </td>
                <td class="text-center">
                    <i class="fa-solid fa-pencil" onclick="getContact(${contact.id})"></i>
                    <i class="fa fa-trash" onclick='removeContact(${index})'></i>
                </td>
            </tr>
        `
    });
    document.querySelector('.table>tbody').innerHTML = htmls.join("");
}


function openModal(){
    document.querySelector('.modal-container').classList.add('show');
}
function closeModal(){
    document.querySelector('.modal-container').classList.remove('show');
    resetModal();
}

function changeAvatar(){
    document.querySelector('.avatar-lg').src = document.querySelector('#avatar').value || 'images/noavatar.jpg';
}

function addContact(){
    let name = document.querySelector('#name').value;
    let avatar = document.querySelector('#avatar').value;
    let mobile = document.querySelector('#mobile').value;
    let email = document.querySelector('#email').value;
    let id = findMaxId() + 1;

    let contact = new Contact(id, name, avatar, mobile, email);
    contacts.push(contact);
    localStorage.setItem(contact_key, JSON.stringify(contacts));
    closeModal();
    renderContact();
}


function resetModal(){
    document.querySelector('#contactId').value = "0";
    document.querySelector('#name').value = "";
    document.querySelector('#avatar').value = "";
    document.querySelector('#mobile').value ="";
    document.querySelector('#email').value = "";
    document.querySelector('.avatar-lg').src = "images/noavatar.jpg";

    document.querySelector('#btnUpdate').classList.add('d-none');
    document.querySelector('#btnAdd').classList.remove('d-none');

    document.querySelector('.modal-title').innerText = "Add Contact";
}
function findMaxId(){
    let max = 0;
    for(let contact of contacts){
        if(contact.id > max){
            max = contact.id;
        }
    }

    return max;
}


function removeContact(index){

    let confirm = window.confirm('Are you sure to remove this contact?');
    if(confirm){
        contacts.splice(index, 1);
        localStorage.setItem(contact_key, JSON.stringify(contacts));
        renderContact();
    }
}

function getContact(contactId){
    let contact = contacts.find(function(ct){
        return ct.id === contactId;
    })

    document.querySelector('#contactId').value = contact.id;
    document.querySelector('#name').value = contact.name;
    document.querySelector('#avatar').value = contact.avatar;
    document.querySelector('#mobile').value = contact.mobile;
    document.querySelector('#email').value = contact.email;
    document.querySelector('.avatar-lg').src = contact.avatar;

    document.querySelector('#btnUpdate').classList.remove('d-none');
    document.querySelector('#btnAdd').classList.add('d-none');

    document.querySelector('.modal-title').innerText = "Update Contact";
    openModal();
}

function updateContact(){
    let id = document.querySelector('#contactId').value;

    let contact = contacts.find(function(ct){
        return ct.id == id;
    })
    
    contact.name = document.querySelector('#name').value;
    contact.avatar = document.querySelector('#avatar').value;
    contact.mobile = document.querySelector('#mobile').value;
    contact.email = document.querySelector('#email').value;

    localStorage.setItem(contact_key, JSON.stringify(contacts));

    closeModal();
    renderContact();
}

function main(){
    init();
    renderContact();
}

main();