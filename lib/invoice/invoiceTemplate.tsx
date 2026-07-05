export function invoiceTemplate(order: any) {
  const itemsHtml = order.items
    .map(
      (item: any, idx: number) => `
        <tr style="background:${idx % 2 === 0 ? "#ffffff" : "#f3f6fb"};">
          <td style="padding:10px 12px; border-bottom:1px solid #eee;">${idx + 1}</td>
          <td style="padding:10px 12px; border-bottom:1px solid #eee;">${item.name}</td>
          <td style="padding:10px 12px; border-bottom:1px solid #eee; text-align:center;">${item.qty}</td>
          <td style="padding:10px 12px; border-bottom:1px solid #eee; text-align:right;">₹${item.price}</td>
          <td style="padding:10px 12px; border-bottom:1px solid #eee; text-align:right; font-weight:600;">₹${item.qty * item.price}</td>
        </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Invoice - ${order.orderNo}</title>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    color: #1f2430;
    background: #eef2f8;
    margin: 0;
    padding: 32px;
  }
  .invoice-wrapper {
    max-width: 720px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 18px rgba(0,0,0,0.06);
  }
  .invoice-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 36px;
    background: #1D4ED8;
  }
  .brand-name {
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }
  .brand-tagline {
    font-size: 12px;
    color: #dbe6ff;
    margin: 2px 0 0;
  }
  .invoice-tag {
    text-align: right;
  }
  .invoice-tag h2 {
    margin: 0;
    font-size: 20px;
    letter-spacing: 1px;
    color: #ffffff;
  }
  .invoice-tag p {
    margin: 4px 0 0;
    font-size: 13px;
    color: #dbe6ff;
  }
  .invoice-body {
    padding: 32px 36px;
  }
  .details-grid {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
  .details-block h4 {
    margin: 0 0 8px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #6b7a99;
  }
  .details-block p {
    margin: 0 0 4px;
    font-size: 14px;
    line-height: 1.5;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 24px;
  }
  thead th {
    background: #1D4ED8;
    color: #ffffff;
    text-align: left;
    padding: 10px 12px;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }
  .totals {
    display: flex;
    justify-content: flex-end;
  }
  .totals-table {
    width: 260px;
  }
  .totals-table td {
    padding: 6px 0;
    font-size: 14px;
  }
  .totals-table .grand-total td {
    border-top: 2px solid #1D4ED8;
    padding-top: 12px;
    font-size: 18px;
    font-weight: 700;
    color: #1D4ED8;
  }
  .invoice-footer {
    padding: 20px 36px 28px;
    border-top: 1px solid #eee;
    font-size: 12px;
    color: #6b7a99;
    text-align: center;
    line-height: 1.7;
  }
  .invoice-footer strong {
    color: #1D4ED8;
  }
</style>
</head>

<body>
  <div class="invoice-wrapper">

    <!-- Header -->
    <div class="invoice-header">
      <div>
        <p class="brand-name">UltraCrackers</p>
        <p class="brand-tagline">Premium Fireworks &amp; Crackers</p>
      </div>
      <div class="invoice-tag">
        <h2>INVOICE</h2>
        <p>#${order.orderNo}</p>
      </div>
    </div>

    <div class="invoice-body">

      <!-- Bill To / Company details -->
      <div class="details-grid">
        <div class="details-block">
          <h4>Billed To</h4>
          <p><strong>${order.customer}</strong></p>
          <p>${order.phone}</p>
          <p>${order.address}</p>
        </div>
        <div class="details-block" style="text-align:right;">
          <h4>From</h4>
          <p><strong>UltraCrackers</strong></p>
          <p>Door no: 2/229, Plot no 1008</p>
          <p>Survey no: 228/30, Village E. Muthulingapuram</p>
          <p>Taluk Sattur, District Virudhunagar</p>
          <p>+91 8526230861 &nbsp;|&nbsp; +91 9360528398</p>
        </div>
      </div>

      <!-- Items table -->
      <table>
        <thead>
          <tr>
            <th style="width:36px;">#</th>
            <th>Product</th>
            <th style="text-align:center;">Qty</th>
            <th style="text-align:right;">Price</th>
            <th style="text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <!-- Totals -->
      <div class="totals">
        <table class="totals-table">
          <tr>
            <td>Subtotal</td>
            <td style="text-align:right;">₹${order.total}</td>
          </tr>
          <tr class="grand-total">
            <td>Grand Total</td>
            <td style="text-align:right;">₹${order.total}</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Footer -->
    <div class="invoice-footer">
      <p><strong>Thank you for choosing UltraCrackers!</strong></p>
      <p>
        Door no: 2/229, Plot no 1008, Survey no: 228/30, Village E. Muthulingapuram,
        Taluk Sattur, District Virudhunagar
      </p>
      <p>Contact: +91 8526230861 &nbsp;|&nbsp; +91 9360528398</p>
    </div>

  </div>
</body>
</html>
`;
}