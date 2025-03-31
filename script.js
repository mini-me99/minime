// Tab switching functionality
function showTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
    });

    // Show the selected tab content
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }

    // Update active tab link
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`[onclick="showTab('${tabId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Load content based on tab
    switch(tabId) {
        case 'shop':
            displayProducts();
            break;
        case 'scan':
            initializeQRScanner();
            break;
        case 'cart':
            displayCart();
            break;
        case 'checkout':
            displayOrderDetails();
            break;
        case 'home':
            displayFeaturedProducts();
            break;
    }
}

// Initialize QR Scanner
function initializeQRScanner() {
    const html5QrCode = new Html5Qrcode("reader");
    const config = { 
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
    };

    function onScanSuccess(decodedText, decodedResult) {
        // Stop scanning after successful scan
        html5QrCode.stop().then(() => {
            // First check if it's a product QR code
            const product = products.find(p => p.qrCode === decodedText);
            if (product) {
                showProductDetails(product);
            } else {
                // Check if it's a valid URL
                try {
                    const url = new URL(decodedText);
                    if (confirm(`Open this URL: ${url.href}?`)) {
                        window.open(url.href, '_blank');
                    }
                } catch (e) {
                    // If it's not a URL, show the content
                    alert(`QR Code Content: ${decodedText}`);
                }
            }
        }).catch((err) => {
            console.error('Error stopping scanner:', err);
        });
    }

    function onScanError(errorMessage, error) {
        // Handle scan errors silently
        console.warn(errorMessage);
    }

    html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanError
    ).catch((err) => {
        console.error('Error starting scanner:', err);
        alert('Error starting camera. Please make sure you have granted camera permissions.');
    });
}

function showProductDetails(product) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${product.name}</h2>
            <img src="images/${product.images[0]}" alt="${product.name}" style="max-width: 100%; height: auto;">
            <p>${product.description}</p>
            <p>Price: {product.price}</p>
            <p>Size: ${product.size}</p>
            <div class="product-actions">
                <input type="number" id="modalQuantity${product.id}" value="1" min="1" max="10">
                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, 'images/${product.images[0]}')" class="btn">Add to Cart</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal when clicking the X or outside the modal
    modal.querySelector('.close-modal').onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Product data
const products = [
    {
        id: 1,
        name: 'Mini Mi Code:9170',
        price: 1750,
        description: 'بيجامات خريفي سمر ميلتون - Price per piece: 350, Quantity: 6',
        category: 'tops',
        size: '2-3y',
        images: ['product1-1.jpg', 'product1-2.jpg'],
        qrCode: 'MINIME-9170'
    },
    {
        id: 2,
        name: 'Mini Mi Code:9162',
        price: 1750,
        description: 'بيجامات خريفي سمر ميلتون - Price per piece: 350, Quantity: 6',
        category: 'tops',
        size: '4-5y',
        images: ['product2-1.jpg', 'product2-2.jpg'],
        qrCode: 'MINIME-9162'
    },
    {
        id: 3,
        name: 'Mini Mi Code:9170',
        price: 1750,
        description: 'بيجامات خريفي سمر ميلتون - Price per piece: 350, Quantity: 6',
        category: 'tops',
        size: '6-7y',
        images: ['product3-1.jpg', 'product3-2.jpg'],
        qrCode: 'MINIME-9170'
    },
    {
        id: 4,
        name: 'Mini Mi Code:9159',
        price: 1750,
        description: 'بيجامات خريفي سمر ميلتون - Price per piece: 350, Quantity: 6',
        category: 'tops',
        size: '2-3y',
        images: ['product4-1.jpg', 'product4-2.jpg'],
        qrCode: 'MINIME-9159'
    },
    {
        id: 5,
        name: 'Mini Mi Code:9158',
        price: 1750,
        description: 'بيجامات خريفي سمر ميلتون - Price per piece: 350, Quantity: 6',
        category: 'tops',
        size: '4-5y',
        images: ['product5-1.jpg', 'product5-2.jpg'],
        qrCode: 'MINIME-9158'
    },
    {
        id: 6,
        name: 'Mini Mi Code:9160',
        price: 1750,
        description: 'بيجامات خريفي سمر ميلتون - Price per piece: 350, Quantity: 6',
        category: 'tops',
        size: '6-7y',
        images: ['product6-1.jpg', 'product6-2.jpg'],
        qrCode: 'MINIME-9160'
    },
    {
        id: 7,
        name: 'Mini Mi Code:9156',
        price: 1750,
        description: 'بيجامات خريفي سمر ميلتون - Price per piece: 350, Quantity: 6',
        category: 'tops',
        size: '2-3y',
        images: ['product7-1.jpg', 'product7-2.jpg'],
        qrCode: 'MINIME-9156'
    },
    {
        id: 8,
        name: 'Mini Mi Code:9167',
        price: 1750,
        description: 'بيجامات خريفي سمر ميلتون - Price per piece: 350, Quantity: 6',
        category: 'tops',
        size: '4-5y',
        images: ['product8-1.jpg', 'product8-2.jpg'],
        qrCode: 'MINIME-9167'
    },
    {
        id: 9,
        name: 'Mini Mi Code:9165',
        price: 1750,
        description: 'بيجامات خريفي سمر ميلتون - Price per piece: 350, Quantity: 6',
        category: 'tops',
        size: '6-7y',
        images: ['product9-1.jpg', 'product9-2.jpg'],
        qrCode: 'MINIME-9165'
    },
    {
        id: 10,
        name: 'Mini Mi Code:9163',
        price: 1750,
        description: 'بيجامات خريفي سمر ميلتون - Price per piece: 350, Quantity: 6',
        category: 'tops',
        size: '2-3y',
        images: ['product10-1.jpg', 'product10-2.jpg'],
        qrCode: 'MINIME-9163'
    },
    {
        id: 11,
        name: 'Mini Mi Code:9168',
        price: 1750,
        description: 'بيجامات خريفي سمر ميلتون - Price per piece: 350, Quantity: 6',
        category: 'tops',
        size: '4-5y',
        images: ['product11-1.jpg', 'product11-2.jpg'],
        qrCode: 'MINIME-9168'
    },
    {
        id: 12,
        name: 'Mini Mi Code:9198',
        price: 1975,
        description: 'بيجامات mini me 🦋 خريفي سمر ميلتون H&M من ٢-١٠ - Price per piece: 395, Quantity: 5',
        category: 'tops',
        size: '2-3y',
        images: ['product12-1.jpg', 'product12-2.jpg'],
        qrCode: 'MINIME-9198'
    },
    {
        id: 13,
        name: 'Mini Mi Code:9202',
        price: 1975,
        description: 'بيجامات mini me 🦋 خريفي سمر ميلتون H&M من ٢-١٠ - Price per piece: 395, Quantity: 5',
        category: 'tops',
        size: '4-5y',
        images: ['product13-1.jpg', 'product13-2.jpg'],
        qrCode: 'MINIME-9202'
    },
    {
        id: 14,
        name: 'Mini Mi Code:9211',
        price: 1925,
        description: 'بيجامات mini me 🦋 خريفي سمر ميلتون H&M من ٢-١٠ - Price per piece: 385, Quantity: 5',
        category: 'tops',
        size: '6-7y',
        images: ['product14-1.jpg', 'product14-2.jpg'],
        qrCode: 'MINIME-9211'
    },
    {
        id: 15,
        name: 'Mini Mi Code:9212',
        price: 1925,
        description: 'بيجامات mini me 🦋 خريفي سمر ميلتون H&M من ٢-١٠ - Price per piece: 385, Quantity: 5',
        category: 'tops',
        size: '8-9y',
        images: ['product15-1.jpg', 'product15-2.jpg'],
        qrCode: 'MINIME-9212'
    },
    {
        id: 16,
        name: 'Mini Mi Code:9205',
        price: 1925,
        description: 'بيجامات mini me 🦋 خريفي سمر ميلتون H&M من ٢-١٠ - Price per piece: 385, Quantity: 5',
        category: 'tops',
        size: '9-10y',
        images: ['product16-1.jpg', 'product16-2.jpg'],
        qrCode: 'MINIME-9205'
    },
    {
        id: 17,
        name: 'Mini Mi Code:9208',
        price: 1925,
        description: 'بيجامات mini me 🦋 خريفي سمر ميلتون H&M من ٢-١٠ - Price per piece: 385, Quantity: 5',
        category: 'tops',
        size: '2-3y',
        images: ['product17-1.jpg', 'product17-2.jpg'],
        qrCode: 'MINIME-9208'
    },
    {
        id: 18,
        name: 'Mini Mi Code:9217',
        price: 1800,
        description: 'بيجامات mini me 🦋 خريفي خامه كرينكل SHEIN من ٢-١٠ - Price per piece: 360, Quantity: 5',
        category: 'tops',
        size: '4-5y',
        images: ['product18-1.jpg', 'product18-2.jpg'],
        qrCode: 'MINIME-9217'
    },
    {
        id: 19,
        name: 'Mini Mi Code:9088',
        price: 1800,
        description: 'بيجامات mini me 🦋 خريفي انترلوك قطن من 9m:36 m - Price per piece: 190, Quantity: 12',
        category: 'tops',
        size: '2-3y',
        images: ['product19-1.jpg', 'product19-2.jpg'],
        qrCode: 'MINIME-9088'
    },
    {
        id: 20,
        name: 'Mini Mi Code:9088',
        price: 2280,
        description: 'بيجامات mini me 🦋 خريفي انترلوك قطن من 9m:36 m - Price per piece: 190, Quantity: 12',
        category: 'tops',
        size: '2-3y',
        images: ['product20-1.jpg', 'product20-2.jpg'],
        qrCode: 'MINIME-9088'
    },
    {
        id: 21,
        name: 'Mini Mi Code:9088',
        price: 2280,
        description: 'بيجامات mini me 🦋 خريفي انترلوك قطن من 9m:36 m - Price per piece: 190, Quantity: 12',
        category: 'tops',
        size: '2-3y',
        images: ['product21-1.jpg', 'product21-2.jpg'],
        qrCode: 'MINIME-9088'
    },
    {
        id: 22,
        name: 'Mini Mi Code:9088',
        price: 2280,
        description: 'بيجامات mini me 🦋 خريفي انترلوك قطن من 9m:36 m - Price per piece: 190, Quantity: 12',
        category: 'tops',
        size: '2-3y',
        images: ['product22-1.jpg', 'product22-2.jpg'],
        qrCode: 'MINIME-9088'
    },
    {
        id: 23,
        name: 'Mini Mi Code:9088',
        price: 2280,
        description: 'بيجامات mini me 🦋 خريفي انترلوك قطن من 9m:36 m - Price per piece: 190, Quantity: 12',
        category: 'tops',
        size: '2-3y',
        images: ['product23-1.jpg', 'product23-2.jpg'],
        qrCode: 'MINIME-9088'
    },
    {
        id: 24,
        name: 'Mini Mi Code:9088',
        price: 2280,
        description: 'بيجامات mini me 🦋 خريفي انترلوك قطن من 9m:36 m - Price per piece: 190, Quantity: 12',
        category: 'tops',
        size: '2-3y',
        images: ['product24-1.jpg', 'product24-2.jpg'],
        qrCode: 'MINIME-9088'
    },
    {
        id: 25,
        name: 'Mini Mi Code:9281',
        price: 1475,
        description: 'فستان بلورو و اندر mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 295, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product25-1.jpg', 'product25-2.jpg'],
        qrCode: 'MINIME-9281'
    },
    {
        id: 26,
        name: 'Mini Mi Code:9283',
        price: 1475,
        description: 'فستان بلورو و اندر mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 295, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product26-1.jpg', 'product26-2.jpg'],
        qrCode: 'MINIME-9283'
    },
    {
        id: 27,
        name: 'Mini Mi Code:9284',
        price: 1475,
        description: 'فستان بلورو و اندر mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 295, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product27-1.jpg', 'product27-2.jpg'],
        qrCode: 'MINIME-9284'
    },
    {
        id: 28,
        name: 'Mini Mi Code:9280',
        price: 1475,
        description: 'فستان بلورو و اندر mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 295, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product28-1.jpg', 'product28-2.jpg'],
        qrCode: 'MINIME-9280'
    },
    {
        id: 29,
        name: 'Mini Mi Code:9286',
        price: 1475,
        description: 'فستان بلورو و اندر mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 295, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product29-1.jpg', 'product29-2.jpg'],
        qrCode: 'MINIME-9286'
    },
    {
        id: 30,
        name: 'Mini Mi Code:9282',
        price: 1475,
        description: 'فستان بلورو و اندر mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 295, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product30-1.jpg', 'product30-2.jpg'],
        qrCode: 'MINIME-9282'
    },
    {
        id: 31,
        name: 'Mini Mi Code:9293',
        price: 1275,
        description: 'فستان كم و سورتيت mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 255, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product31-1.jpg', 'product31-2.jpg'],
        qrCode: 'MINIME-9293'
    },
    {
        id: 32,
        name: 'Mini Mi Code:9289',
        price: 1275,
        description: 'فستان كم و سورتيت mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 255, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product32-1.jpg', 'product32-2.jpg'],
        qrCode: 'MINIME-9289'
    },
    {
        id: 33,
        name: 'Mini Mi Code:9292',
        price: 1275,
        description: 'فستان كم و سورتيت mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 255, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product33-1.jpg', 'product33-2.jpg'],
        qrCode: 'MINIME-9292'
    },
    {
        id: 34,
        name: 'Mini Mi Code:9287',
        price: 1275,
        description: 'فستان كم و سورتيت mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 255, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product34-1.jpg', 'product34-2.jpg'],
        qrCode: 'MINIME-9287'
    },
    {
        id: 35,
        name: 'Mini Mi Code:9295',
        price: 1275,
        description: 'فستان كم و سورتيت mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 255, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product35-1.jpg', 'product35-2.jpg'],
        qrCode: 'MINIME-9295'
    },
    {
        id: 36,
        name: 'Mini Mi Code:9296',
        price: 1275,
        description: 'فستان كم و سورتيت mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 255, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product36-1.jpg', 'product36-2.jpg'],
        qrCode: 'MINIME-9296'
    },
    {
        id: 37,
        name: 'Mini Mi Code:9290',
        price: 1275,
        description: 'فستان كم و سورتيت mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 255, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product37-1.jpg', 'product37-2.jpg'],
        qrCode: 'MINIME-9290'
    },
    {
        id: 38,
        name: 'Mini Mi Code:9288',
        price: 1275,
        description: 'فستان كم و سورتيت mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 255, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product38-1.jpg', 'product38-2.jpg'],
        qrCode: 'MINIME-9288'
    },
    {
        id: 39,
        name: 'Mini Mi Code:9294',
        price: 1275,
        description: 'فستان كم و سورتيت mini me 🦋 خريفي انترلوك قطن من ٦-٢٤ شهر - Price per piece: 255, Quantity: 5',
        category: 'dresses',
        size: '2-3y',
        images: ['product39-1.jpg', 'product39-2.jpg'],
        qrCode: 'MINIME-9294'
    },
    {
        id: 40,
        name: 'Mini Mi Code:9179',
        price: 1100,
        description: 'سالوبيت mini me 🦋 خريفي سمر ميلتون قطن من ٦-١٨ شهر - Price per piece: 275, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product40-1.jpg', 'product40-2.jpg'],
        qrCode: 'MINIME-9179'
    },
    {
        id: 41,
        name: 'Mini Mi Code:9175',
        price: 1100,
        description: 'سالوبيت mini me 🦋 خريفي سمر ميلتون قطن من ٦-١٨ شهر - Price per piece: 275, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product41-1.jpg', 'product41-2.jpg'],
        qrCode: 'MINIME-9175'
    },
    {
        id: 42,
        name: 'Mini Mi Code:9173',
        price: 1100,
        description: 'سالوبيت mini me 🦋 خريفي سمر ميلتون قطن من ٦-١٨ شهر - Price per piece: 275, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product42-1.jpg', 'product42-2.jpg'],
        qrCode: 'MINIME-9173'
    },
    {
        id: 43,
        name: 'Mini Mi Code:9177',
        price: 1100,
        description: 'سالوبيت mini me 🦋 خريفي سمر ميلتون قطن من ٦-١٨ شهر - Price per piece: 275, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product43-1.jpg', 'product43-2.jpg'],
        qrCode: 'MINIME-9177'
    },
    {
        id: 44,
        name: 'Mini Mi Code:9178',
        price: 1100,
        description: 'سالوبيت mini me 🦋 خريفي سمر ميلتون قطن من ٦-١٨ شهر - Price per piece: 275, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product44-1.jpg', 'product44-2.jpg'],
        qrCode: 'MINIME-9178'
    },
    {
        id: 45,
        name: 'Mini Mi Code:9176',
        price: 1100,
        description: 'سالوبيت mini me 🦋 خريفي سمر ميلتون قطن من ٦-١٨ شهر - Price per piece: 275, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product45-1.jpg', 'product45-2.jpg'],
        qrCode: 'MINIME-9176'
    },
    {
        id: 46,
        name: 'Mini Mi Code:9171',
        price: 1100,
        description: 'سالوبيت mini me 🦋 خريفي سمر ميلتون قطن من ٦-١٨ شهر - Price per piece: 275, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product46-1.jpg', 'product46-2.jpg'],
        qrCode: 'MINIME-9171'
    },
    {
        id: 47,
        name: 'Mini Mi Code:9172',
        price: 1100,
        description: 'سالوبيت mini me 🦋 خريفي سمر ميلتون قطن من ٦-١٨ شهر - Price per piece: 275, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product47-1.jpg', 'product47-2.jpg'],
        qrCode: 'MINIME-9172'
    },
    {
        id: 48,
        name: 'Mini Mi Code:9174',
        price: 1100,
        description: 'سالوبيت mini me 🦋 خريفي سمر ميلتون قطن من ٦-١٨ شهر - Price per piece: 275, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product48-1.jpg', 'product48-2.jpg'],
        qrCode: 'MINIME-9174'
    },
    {
        id: 49,
        name: 'Mini Mi Code:9267',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product49-1.jpg', 'product49-2.jpg'],
        qrCode: 'MINIME-9267'
    },
    {
        id: 50,
        name: 'Mini Mi Code:9276',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product50-1.jpg', 'product50-2.jpg'],
        qrCode: 'MINIME-9276'
    },
    {
        id: 51,
        name: 'Mini Mi Code:9266',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product51-1.jpg', 'product51-2.jpg'],
        qrCode: 'MINIME-9266'
    },
    {
        id: 52,
        name: 'Mini Mi Code:9275',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product52-1.jpg', 'product52-2.jpg'],
        qrCode: 'MINIME-9275'
    },
    {
        id: 53,
        name: 'Mini Mi Code:9273',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product53-1.jpg', 'product53-2.jpg'],
        qrCode: 'MINIME-9273'
    },
    {
        id: 54,
        name: 'Mini Mi Code:9270',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product54-1.jpg', 'product54-2.jpg'],
        qrCode: 'MINIME-9270'
    },
    {
        id: 55,
        name: 'Mini Mi Code:9268',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product55-1.jpg', 'product55-2.jpg'],
        qrCode: 'MINIME-9268'
    },
    {
        id: 56,
        name: 'Mini Mi Code:9269',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product56-1.jpg', 'product56-2.jpg'],
        qrCode: 'MINIME-9269'
    },
    {
        id: 57,
        name: 'Mini Mi Code:9274',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product57-1.jpg', 'product57-2.jpg'],
        qrCode: 'MINIME-9274'
    },
    {
        id: 58,
        name: 'Mini Mi Code:9277',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product58-1.jpg', 'product58-2.jpg'],
        qrCode: 'MINIME-9277'
    },
    {
        id: 59,
        name: 'Mini Mi Code:9271',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product59-1.jpg', 'product59-2.jpg'],
        qrCode: 'MINIME-9271'
    },
    {
        id: 60,
        name: 'Mini Mi Code:9272',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product60-1.jpg', 'product60-2.jpg'],
        qrCode: 'MINIME-9272'
    },
    {
        id: 61,
        name: 'Mini Mi Code:9278',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product61-1.jpg', 'product61-2.jpg'],
        qrCode: 'MINIME-9278'
    },
    {
        id: 62,
        name: 'Mini Mi Code:9265',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product62-1.jpg', 'product62-2.jpg'],
        qrCode: 'MINIME-9265'
    },
    {
        id: 63,
        name: 'Mini Mi Code:9279',
        price: 900,
        description: 'سالوبيت mini me 🦋 خريفي إنترلوك قطن من٣-١٢ شهر - Price per piece: 225, Quantity: 4',
        category: 'dresses',
        size: '2-3y',
        images: ['product63-1.jpg', 'product63-2.jpg'],
        qrCode: 'MINIME-9279'
    },
    {
        id: 64,
        name: 'Mini Mi Code:9238',
        price: 3500,
        description: 'توينز mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 350, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product64-1.jpg', 'product64-2.jpg'],
        qrCode: 'MINIME-9238'
    },
    {
        id: 65,
        name: 'Mini Mi Code:9238',
        price: 3500,
        description: 'توينز mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 350, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product65-1.jpg', 'product65-2.jpg'],
        qrCode: 'MINIME-9238'
    },
    {
        id: 66,
        name: 'Mini Mi Code:9237',
        price: 3500,
        description: 'توينز mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 350, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product66-1.jpg', 'product66-2.jpg'],
        qrCode: 'MINIME-9237'
    },
    {
        id: 67,
        name: 'Mini Mi Code:9237',
        price: 3500,
        description: 'توينز mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 350, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product67-1.jpg', 'product67-2.jpg'],
        qrCode: 'MINIME-9237'
    },
    {
        id: 68,
        name: 'Mini Mi Code:9240',
        price: 3800,
        description: 'توينز mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 380, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product68-1.jpg', 'product68-2.jpg'],
        qrCode: 'MINIME-9240'
    },
    {
        id: 69,
        name: 'Mini Mi Code:9240',
        price: 3800,
        description: 'توينز mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 380, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product69-1.jpg', 'product69-2.jpg'],
        qrCode: 'MINIME-9240'
    },
    {
        id: 70,
        name: 'Mini Mi Code:9241',
        price: 3800,
        description: 'توينز mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 380, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product70-1.jpg', 'product70-2.jpg'],
        qrCode: 'MINIME-9241'
    },
    {
        id: 71,
        name: 'Mini Mi Code:9234',
        price: 5850,
        description: 'أطقم mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 585, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product71-1.jpg', 'product71-2.jpg'],
        qrCode: 'MINIME-9234'
    },
    {
        id: 72,
        name: 'Mini Mi Code:9234',
        price: 5850,
        description: 'أطقم mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 585, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product72-1.jpg', 'product72-2.jpg'],
        qrCode: 'MINIME-9234'
    },
    {
        id: 73,
        name: 'Mini Mi Code:9233',
        price: 5850,
        description: 'أطقم mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 585, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product73-1.jpg', 'product73-2.jpg'],
        qrCode: 'MINIME-9233'
    },
    {
        id: 74,
        name: 'Mini Mi Code:9233',
        price: 5850,
        description: 'أطقم mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 585, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product74-1.jpg', 'product74-2.jpg'],
        qrCode: 'MINIME-9233'
    },
    {
        id: 75,
        name: 'Mini Mi Code:9232',
        price: 5850,
        description: 'أطقم mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 585, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product75-1.jpg', 'product75-2.jpg'],
        qrCode: 'MINIME-9232'
    },
    {
        id: 76,
        name: 'Mini Mi Code:9235',
        price: 6250,
        description: 'أطقم mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 625, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product76-1.jpg', 'product76-2.jpg'],
        qrCode: 'MINIME-9235'
    },
    {
        id: 77,
        name: 'Mini Mi Code:9235',
        price: 6250,
        description: 'أطقم mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 625, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product77-1.jpg', 'product77-2.jpg'],
        qrCode: 'MINIME-9235'
    },
    {
        id: 78,
        name: 'Mini Mi Code:9236',
        price: 6250,
        description: 'أطقم mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 625, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product78-1.jpg', 'product78-2.jpg'],
        qrCode: 'MINIME-9236'
    },
    {
        id: 79,
        name: 'Mini Mi Code:9236',
        price: 6250,
        description: 'أطقم mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 625, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product79-1.jpg', 'product79-2.jpg'],
        qrCode: 'MINIME-9236'
    },
    {
        id: 80,
        name: 'Mini Mi Code:9308',
        price: 2650,
        description: 'دريس كم mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 265, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product80-1.jpg', 'product80-2.jpg'],
        qrCode: 'MINIME-9308'
    },
    {
        id: 81,
        name: 'Mini Mi Code:9308',
        price: 2650,
        description: 'دريس كم mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 265, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product81-1.jpg', 'product81-2.jpg'],
        qrCode: 'MINIME-9308'
    },
    {
        id: 82,
        name: 'Mini Mi Code:9307',
        price: 2650,
        description: 'دريس كم mini me 🦋 خريفي لونين من٦-٣٦ و من ٢-٦ - Price per piece: 265, Quantity: 10',
        category: 'dresses',
        size: '2-3y',
        images: ['product82-1.jpg', 'product82-2.jpg'],
        qrCode: 'MINIME-9307'
    },
    {
        id: 83,
        name: 'Mini Mi Code:9346',
        price: 3160,
        description: 'سالوبيت+ تيشرت mini me 🦋 جينز لون و جبردين لونين من ١-٤ - Price per piece: 395, Quantity: 8',
        category: 'dresses',
        size: '2-3y',
        images: ['product83-1.jpg', 'product83-2.jpg'],
        qrCode: 'MINIME-9346'
    },
    {
        id: 84,
        name: 'Mini Mi Code:9344',
        price: 3160,
        description: 'سالوبيت+ تيشرت mini me 🦋 جينز لون و جبردين لونين من ١-٤ - Price per piece: 395, Quantity: 8',
        category: 'dresses',
        size: '2-3y',
        images: ['product84-1.jpg', 'product84-2.jpg'],
        qrCode: 'MINIME-9344'
    },
    {
        id: 85,
        name: 'Mini Mi Code:9347',
        price: 3160,
        description: 'سالوبيت+ تيشرت mini me 🦋 جينز لون و جبردين لونين من ١-٤ - Price per piece: 395, Quantity: 8',
        category: 'dresses',
        size: '2-3y',
        images: ['product85-1.jpg', 'product85-2.jpg'],
        qrCode: 'MINIME-9347'
    },
    {
        id: 86,
        name: 'Mini Mi Code:9345',
        price: 3160,
        description: 'سالوبيت+ تيشرت mini me 🦋 جينز لون و جبردين لونين من ١-٤ - Price per piece: 395, Quantity: 8',
        category: 'dresses',
        size: '2-3y',
        images: ['product86-1.jpg', 'product86-2.jpg'],
        qrCode: 'MINIME-9345'
    }
]; 

function displayProducts() {
    const productsContainer = document.querySelector('.products-grid');
    productsContainer.innerHTML = '';

    const categoryFilter = document.getElementById('category-filter').value;
    const sizeFilter = document.getElementById('size-filter').value;

    const filteredProducts = products.filter(product => {
        const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
        const sizeMatch = sizeFilter === 'all' || product.size === sizeFilter;
        return categoryMatch && sizeMatch;
    });

    filteredProducts.forEach(product => {
        productsContainer.innerHTML += `
            <div class="product">
                <a href="product-details.html?id=${product.id}">
                    <img src="images/${product.images[0]}" alt="${product.name}" width="300">
                </a>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">${product.price}</p>
                <div class="product-actions">
                    <a href="product-details.html?id=${product.id}" class="btn view-all-btn">View All</a>
                </div>
            </div>
        `;
    });
}

function displayFeaturedProducts() {
    const featuredContainer = document.querySelector('.featured-grid');
    featuredContainer.innerHTML = '';

    // Show first 2 products as featured
    products.slice(0, 2).forEach(product => {
        featuredContainer.innerHTML += `
            <div class="product">
                <a href="product-details.html?id=${product.id}">
                    <img src="images/${product.images[0]}" alt="${product.name}" width="300">
                </a>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">${product.price}</p>
                <div class="product-actions">
                    <a href="product-details.html?id=${product.id}" class="btn view-all-btn">View All</a>
                </div>
            </div>
        `;
    });
}

function filterProducts() {
    displayProducts();
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, name, price, image) {
    // Get quantity from the input field
    const quantityInput = document.querySelector(`input[id="quantity${productId}"], input[id="modalQuantity${productId}"]`);
    let quantity = 1;
    
    if (quantityInput) {
        quantity = Number(quantityInput.value);
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        } else if (quantity > 10) {
            quantity = 10;
        }
    }
    
    // Create cart item
    const cartItem = {
        productId: productId,
        name: name,
        price: price,
        quantity: quantity,
        image: image
    };
    
    // Add to cart
    cart.push(cartItem);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show confirmation
    alert(quantity + " " + name + "(s) added to cart!");
    
    // Update display
    showTab('cart');
    updateCartTotal();
}

function displayCart() {
    let cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartContent.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" style="max-width: 100px;">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                    </div>
                    <p>Total: ${itemTotal.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${index})" class="remove-item">×</button>
            </div>
        `;
    });
    
    updateCartTotal();
}

function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) return;
    if (newQuantity > 10) return;
    
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total-amount').textContent = `${total.toFixed(2)}`;
}

function displayOrderDetails() {
    let orderDetails = document.getElementById('order-details');
    orderDetails.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        orderDetails.innerHTML = '<p>No items in cart.</p>';
        return;
    }

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        orderDetails.innerHTML += `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" width="300">
                <div class="order-item-details">
                    <h3>${item.name}</h3>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: ${item.price}</p>
                    <p>Total: ${itemTotal.toFixed(2)}</p>
                </div>
                <input type="hidden" name="items[]" value="${item.name} (${item.quantity}) - ${itemTotal.toFixed(2)}">
                <input type="hidden" name="images[]" value="${item.image}">
            </div>
        `;
    });
    
    orderDetails.innerHTML += `
        <div class="order-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <input type="hidden" name="total" value="${total.toFixed(2)}">
        </div>
    `;
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    showTab('home'); // Switch to home tab after clearing cart
}

function showLightbox(productId) {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    lightboxContent.innerHTML = ''; // Clear previous images
    const product = products.find(p => p.id === productId);

    if (product && product.images) {
        product.images.forEach(image => {
            lightboxContent.innerHTML += `<img src="images/${image}" alt="${product.name}" class="lightbox-image">`;
        });
        lightbox.style.display = 'flex';
    }
}

function hideLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Show home tab by default
    showTab('home');
}); 
