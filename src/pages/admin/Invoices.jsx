import { useState } from 'react';

// 1. Blueprint expanded with the Fine Print
const BLANK_INVOICE = {
  invoiceNo: '0044/26',
  date: '22/01/2026',
  currency: 'MKD',
  clientDetails: 'BAKO NUTS\nINDUSTRISKA - 8\nMK-1000 Скопје',
  truckPlate: '',
  trailerPlate: '',
  packages: '1x40\'HC',
  grossWeight: '19264 kgs',
  goods: '1-PEANUT INSHELL',
  loadPlace: 'Thessaloniki',
  unloadPlace: 'Skopje',
  loadDate: '05/01/2026',
  unloadDate: '22/01/2026',
  items: [
    { desc: 'Транзитно манипулативни трошоци во Солун и транспорт до Скопје', qty: '1', price: '180595', amount: '180595' }
  ],
  totals: { totalLabel: 'ВКУПНО MKD', totalAmount: '180595' },
  
  // NEW: The Legal Footer Notes
  legalNotes: 'ОСЛОБОДЕНО ОД ДДВ СОГЛАСНО ЧЛЕН 24 СТАВ 3/5 И ВО СОГЛАСНОСТ СО ЧЛЕН 21 СТАВ 2 ТОЧКА 2 ОД ЗДДВ\n\nЗа пресметка користен продажен курс на Комерцијална Банка важечки на денот на извршување на услугата, во случај на зголемување на курсот до денот на уплата, следи дофактурирање на курсна разлика.\n\nAny delay in payment overdue is subject to interest, charged according to official Law interest rate.\nЗа секое доцнење при плаќање на фактурата вон валутниот рок се пресметува Законска затезна камата.'
};

export default function Invoices() {
  const [invoice, setInvoice] = useState(BLANK_INVOICE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = value;
    
    if (field === 'qty' || field === 'price') {
      const qty = parseFloat(newItems[index].qty) || 0;
      const price = parseFloat(newItems[index].price) || 0;
      newItems[index].amount = (qty * price).toFixed(2);
    }
    
    const newTotal = newItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    
    setInvoice(prev => ({
      ...prev,
      items: newItems,
      totals: { ...prev.totals, totalAmount: newTotal.toFixed(2) }
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Invoice Generator</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 shadow-sm transition-all">
          Export PDF
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: The Editor */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-y-auto max-h-[75vh]">
          
          <h2 className="text-xl font-semibold mb-4 text-slate-700 border-b pb-2">1. Header Info</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Invoice #</label>
              <input type="text" name="invoiceNo" value={invoice.invoiceNo} onChange={handleInputChange} className="w-full border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Date</label>
              <input type="text" name="date" value={invoice.date} onChange={handleInputChange} className="w-full border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Currency</label>
              <select name="currency" value={invoice.currency} onChange={handleInputChange} className="w-full border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none bg-white">
                <option value="MKD">MKD</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-slate-700 border-b pb-2">2. Client Details</h2>
          <div className="mb-6">
            <textarea name="clientDetails" value={invoice.clientDetails} onChange={handleInputChange} rows="4" className="w-full border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none resize-none" />
          </div>

          <h2 className="text-xl font-semibold mb-4 text-slate-700 border-b pb-2">3. Shipment Details</h2>
          <div className="grid grid-cols-5 gap-2 mb-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Truck</label>
              <input type="text" name="truckPlate" value={invoice.truckPlate} onChange={handleInputChange} className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Trailer</label>
              <input type="text" name="trailerPlate" value={invoice.trailerPlate} onChange={handleInputChange} className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Collie</label>
              <input type="text" name="packages" value={invoice.packages} onChange={handleInputChange} className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Weight</label>
              <input type="text" name="grossWeight" value={invoice.grossWeight} onChange={handleInputChange} className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Goods</label>
              <input type="text" name="goods" value={invoice.goods} onChange={handleInputChange} className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Load Place & Date</label>
              <div className="flex gap-2">
                <input type="text" name="loadPlace" value={invoice.loadPlace} onChange={handleInputChange} className="w-2/3 border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none" />
                <input type="text" name="loadDate" value={invoice.loadDate} onChange={handleInputChange} className="w-1/3 border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Unload Place & Date</label>
              <div className="flex gap-2">
                <input type="text" name="unloadPlace" value={invoice.unloadPlace} onChange={handleInputChange} className="w-2/3 border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none" />
                <input type="text" name="unloadDate" value={invoice.unloadDate} onChange={handleInputChange} className="w-1/3 border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-slate-700 border-b pb-2">4. Services & Pricing</h2>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 space-y-3">
            {invoice.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-6">
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Description</label>
                  <input type="text" value={item.desc} onChange={(e) => handleItemChange(index, 'desc', e.target.value)} className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Qty</label>
                  <input type="number" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Price</label>
                  <input type="number" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Amount</label>
                  <input type="text" value={item.amount} disabled className="w-full border border-transparent bg-slate-200 p-2 rounded-md text-sm font-bold text-slate-700" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mb-6">
            <div className="bg-slate-800 text-white p-4 rounded-xl shadow-md min-w-[250px]">
              <p className="text-sm font-semibold text-slate-300 mb-1">GRAND TOTAL</p>
              <p className="text-3xl font-bold">{invoice.totals.totalAmount} {invoice.currency}</p>
            </div>
          </div>

          {/* NEW Section 5: Legal Notes */}
          <h2 className="text-xl font-semibold mb-4 text-slate-700 border-b pb-2">5. Fine Print (Footer)</h2>
          <div className="mb-6">
            <textarea 
              name="legalNotes" 
              value={invoice.legalNotes} 
              onChange={handleInputChange} 
              rows="6" 
              className="w-full border border-slate-300 p-2 rounded-md text-xs text-slate-600 focus:ring-2 focus:ring-red-500 focus:outline-none resize-y" 
            />
          </div>

        </div>

        {/* Right Column: Live Memory Check */}
        <div className="bg-slate-300 rounded-xl border-4 border-dashed border-slate-400 p-8 min-h-[600px]">
          <h3 className="text-slate-500 font-bold mb-4 border-b border-slate-400 pb-2">Data Ready for PDF Engine:</h3>
          <div className="font-mono text-sm text-slate-800 space-y-2">
            <p className="text-green-700 font-bold">✓ Header Data Captured</p>
            <p className="text-green-700 font-bold">✓ Client Data Captured</p>
            <p className="text-green-700 font-bold">✓ Shipment Data Captured</p>
            <p className="text-green-700 font-bold">✓ Math Calculated ({invoice.totals.totalAmount})</p>
            <p className="text-green-700 font-bold">✓ Legal Terms Captured</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
