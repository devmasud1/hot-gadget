const findDetails = async (searchByUserPhone = "10", isShowAll) => {
  const url = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchByUserPhone}`
  );
  const result = await url.json();
  const phones = result.data;
  displayApiData(phones, isShowAll);
};

const displayApiData = (phones, isShowAll) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  const noAvailable = document.getElementById("no-available");
  if (phones.length === 0) {
    noAvailable.classList.remove("hidden");
  } else {
    noAvailable.classList.add("hidden");
  }

  phones.forEach((phone) => {
    const { phone_name, image, slug } = phone;

    const phoneCard = document.createElement("div");
    phoneCard.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure class="p-10 m-8 bg-slate-300">
                    <img src="${image}" alt="Shoes" class="rounded-xl "/>
             </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone_name}</h2>
                 <p>There are many variations of <br/>
                  passages of available, but the <br/>
                  majority have suffered</p>
                <div class="card-actions">
                    <button onclick="showDetails('${slug}')" class="btn btn-success">show details</button>
                </div>
            </div>
         </div>
    `;
    cardContainer.appendChild(phoneCard);
  });
  handleLoading(false);
};

const handleSearch = (isShowAll) => {
  handleLoading(true);
  const searchPhone = document.getElementById("searchPhone");
  const searchByUserPhone = searchPhone.value;

  findDetails(searchByUserPhone, isShowAll, searchPhone);
};

const showAllPhones = () => {
  handleSearch(true);
};

const handleLoading = (loading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (loading === true) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const showDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const phone = await res.json();
  const phoneDetails = phone.data;
  console.log(phoneDetails);
  const { brand, image, name, releaseDate, slug } = phoneDetails;
  const { storage, displaySize, chipSet, memory } = phoneDetails.mainFeatures;
  show_more.showModal();

  const modalBoxContainer = document.getElementById("modalBox-container");
  modalBoxContainer.innerHTML = `
          <div class="card bg-base-100">
            <figure class="p-10 m-8 bg-slate-300">
                    <img src="${image}" alt="Shoes" class="rounded-xl"/>
             </figure>
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                 <p>It is a long established fact that a reader will be distracted by the readable content <br/>
                  of a page when looking at its layout.</p>
                 
                 <p><strong>Storage :</strong> ${storage} </p>
                 <p><strong>Display Size:</strong> ${displaySize} </p>
                 <p><strong>Display Size:</strong> ${chipSet} </p>
                 <p><strong>Display Size:</strong> ${memory} </p>
                 
                 <p><strong>Slug :</strong> ${slug} </p>
                 <p><strong>Release data :</strong> ${releaseDate} </p>
                 <p><strong>Brand:</strong> ${brand} </p>
                 <p><strong>GPS :</strong> ${phoneDetails.others.GPS} </p>    
            </div>
           </div>
  `;
};

 findDetails();
