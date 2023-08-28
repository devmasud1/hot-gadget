const findDetails = async (searchByUserPhone = "13", isShowAll) => {
  console.log(typeof isShowAll);
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
  console.log("is show all", isShowAll);

  // if (!isShowAll) {
  //   phones = phones.slice(0, 12);
  // }
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const { phone_name, image, slug } = phone;
    // console.log(slug)

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
                    <button onclick="showDetails('${slug}')" class="btn btn-primary">show details</button>
                </div>
            </div>
         </div>
    `;
    cardContainer.appendChild(phoneCard);
  });
  // searchPhone.value ='';
};

const handleSearch = (isShowAll) => {
  const searchPhone = document.getElementById("searchPhone");
  const searchByUserPhone = searchPhone.value;

  //console.log(phones)

  findDetails(searchByUserPhone, isShowAll, searchPhone);
  // searchPhone.value = "";
};

const showAllPhones = () => {
  handleSearch(true);
};

// findDetails();

const showDetails = async (id) => {
  console.log(id);
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
