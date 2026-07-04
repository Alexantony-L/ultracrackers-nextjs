"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, ArrowLeft } from "lucide-react";
import { useCart } from "./CartContext";

/**
 * CartDrawer
 * Slide-in panel from the right with a two-step flow:
 *   Step 1 "review"  -> cart items with quantity steppers + estimate total
 *   Step 2 "details" -> customer details form + order summary + submit
 *
 * Design intentionally avoids a solid loud background color and a giant
 * red circular close icon — uses a neutral white panel, subtle shadow,
 * and a small ghost-style close button for a more professional look.
 */

const MINIMUM_ORDER = 2000;
const STATES = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"];

type Step = "review" | "details";

const WHATSAPP_NUMBER = "+917867060105";

const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, subtotal } =
    useCart();
  const [step, setStep] = useState<Step>("review");
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    state: STATES[0],
    city: "",
    address: "",
  });

  if (!isOpen) return null;

  const discountTotal = 0; // wire up real discount logic when available
  const packingChargePercent = 0;
  const packingCharge = (subtotal * packingChargePercent) / 100;
  const overallTotal = subtotal - discountTotal + packingCharge;
  const belowMinimum = overallTotal < MINIMUM_ORDER && items.length > 0;

  const handleClose = () => {
    setStep("review");
    closeCart();
  };

  const buildWhatsAppMessage = () => {
    const itemLines = items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name} x ${item.quantity} - ₹${(
            item.price * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n");

    return [
      "*New Order Estimate - Crackers Win Crackers*",
      "",
      "*Items:*",
      itemLines,
      "",
      `*Overall Total:* ₹${overallTotal.toLocaleString("en-IN")}`,
      "",
      "*Customer Details:*",
      `Name: ${form.name}`,
      `Mobile: ${form.mobile}`,
      `Email: ${form.email}`,
      `State: ${form.state}`,
      `City: ${form.city}`,
      `Address: ${form.address}`,
    ].join("\n");
  };

  const handleSubmit = () => {
    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    clearCart();
    setForm({ name: "", mobile: "", email: "", state: STATES[0], city: "", address: "" });
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={handleClose}
      />

      {/* Panel */}
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Crackers Win Crackers</h2>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">
              2/715, Muthalanayackanpatti road. Near PSNL College, Mettamalai
              Sivakasi Main Road.626 203.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close cart"
            className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 px-6 py-3 text-xs font-medium text-gray-500">
          <span className={step === "review" ? "text-teal-600" : ""}>1. Review</span>
          <span className="h-px flex-1 bg-gray-200" />
          <span className={step === "details" ? "text-teal-600" : ""}>2. Details</span>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {step === "review" ? (
            <>
              {items.length === 0 ? (
                <p className="mt-10 text-center text-sm text-gray-500">
                  Your cart is empty.
                </p>
              ) : (
                <ul className="mt-2 divide-y divide-gray-100">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 py-4">
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          ₹{item.price.toLocaleString("en-IN")} each
                        </p>

                        {/* Quantity stepper */}
                        <div className="mt-2 inline-flex items-center rounded-md border border-gray-200">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-gray-500 transition hover:bg-gray-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center text-gray-500 transition hover:bg-gray-50"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                          className="text-gray-300 transition hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <div className="mt-2 space-y-4">
              <Field label="Name">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                />
              </Field>

              <Field label="Mobile Number">
                <input
                  type="tel"
                  placeholder="Your Mobile Number"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="input"
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                />
              </Field>

              <Field label="State">
                <select
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="input"
                >
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              {belowMinimum && <MinimumOrderNotice />}

              <Field label="City">
                <input
                  type="text"
                  placeholder="Your City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="input"
                />
              </Field>

              <Field label="Address">
                <textarea
                  placeholder="Your Address"
                  rows={3}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="input resize-none"
                />
              </Field>

              {/* Order summary */}
              <div className="mt-6 space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
                <SummaryRow label="Total" value={subtotal} />
                <SummaryRow label="Discount Total" value={discountTotal} />
                <SummaryRow label="Net Rate" value={subtotal - discountTotal} />
                <SummaryRow
                  label={`Packing Charge (${packingChargePercent}%)`}
                  value={packingCharge}
                />
                <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-2 text-base font-semibold text-gray-900">
                  <span>Overall Total</span>
                  <span>₹{overallTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {belowMinimum && <MinimumOrderNotice />}
            </div>
          )}
        </div>

        {/* Footer / actions */}
        <div className="border-t border-gray-100 px-6 py-4">
          {step === "review" ? (
            <>
              <div className="mb-3 flex items-center justify-between text-sm font-semibold text-gray-900">
                <span>Estimate Total</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <button
                type="button"
                disabled={items.length === 0}
                onClick={() => setStep("details")}
                className="w-full rounded-md bg-teal-600 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Continue Estimate
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("review")}
                className="flex items-center justify-center gap-1.5 rounded-md border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="button"
                disabled={belowMinimum}
                onClick={handleSubmit}
                className="flex-1 rounded-md bg-teal-600 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Shared input styling (Tailwind @apply-style via className string) */}
      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          color: #111827;
        }
        .input:focus {
          outline: none;
          border-color: #0d9488;
          box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.15);
        }
      `}</style>
    </div>
  );
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div>
    <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
    {children}
  </div>
);

const SummaryRow: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="flex items-center justify-between text-gray-600">
    <span>{label}</span>
    <span>₹{value.toLocaleString("en-IN")}</span>
  </div>
);

const MinimumOrderNotice: React.FC = () => (
  <div className="flex items-center justify-between rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
    <span>Minimum Order</span>
    <span>₹{MINIMUM_ORDER.toLocaleString("en-IN")}</span>
  </div>
);

export default CartDrawer;