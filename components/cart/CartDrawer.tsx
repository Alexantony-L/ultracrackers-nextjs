"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCart } from "./CartContext";

/**
 * CartDrawer
 * Slide-in panel from the right with a two-step flow:
 *   Step 1 "review"  -> cart items with quantity steppers + estimate total
 *   Step 2 "details" -> customer details form + order summary + submit
 */

const MINIMUM_ORDER = 2000;
const STATES = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"];

type Step = "review" | "details";

type FormState = {
  name: string;
  mobile: string;
  email: string;
  state: string;
  city: string;
  address: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm = (): FormState => ({
  name: "",
  mobile: "",
  email: "",
  state: STATES[0],
  city: "",
  address: "",
});

const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, subtotal } =
    useCart();
  const [step, setStep] = useState<Step>("review");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const discountTotal = 0;
  const packingChargePercent = 0;
  const packingCharge = Number(((subtotal * packingChargePercent) / 100).toFixed(2));
  const netRate = subtotal - discountTotal;
  const overallTotal = netRate + packingCharge;
  const belowMinimum = overallTotal < MINIMUM_ORDER && items.length > 0;

  const resetFlow = () => {
    setStep("review");
    setErrors({});
    setSubmissionError(null);
    setIsSubmitting(false);
    setShowSuccess(false);
  };

  const handleClose = () => {
    resetFlow();
    closeCart();
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required";

    const mobile = form.mobile.trim();
    if (!mobile) nextErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(mobile)) {
      nextErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    const email = form.email.trim();
    if (!email) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!form.state.trim()) nextErrors.state = "State is required";
    if (!form.city.trim()) nextErrors.city = "City is required";
    if (!form.address.trim()) nextErrors.address = "Address is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const payload = {
      orderNo: `ORD-${Date.now()}`,
      customer: form.name.trim(),
      phone: form.mobile.trim(),
      email: form.email.trim(),
      state: form.state,
      city: form.city.trim(),
      address: form.address.trim(),
      total: overallTotal,
      subtotal,
      items: items.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_ORDER_API_URL || "http://localhost:3000/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to place your order right now.");
      }

      clearCart();
      setForm(emptyForm());
      setErrors({});
      setShowSuccess(true);
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : "Unable to place your order right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={handleClose}
      />

      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Ultra Crackers</h2>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">
              door no: 2/229 plot no 1008 , survey no: 228/30
              village e.muthu linga puram ,taluk sattur
              district virudhunagar
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

        <div className="flex items-center gap-2 px-6 py-3 text-xs font-medium text-gray-500">
          <span className={step === "review" ? "text-teal-600" : ""}>1. Review</span>
          <span className="h-px flex-1 bg-gray-200" />
          <span className={step === "details" ? "text-teal-600" : ""}>2. Details</span>
        </div>

        <div className="relative flex-1 overflow-y-auto px-6 pb-6">
          {showSuccess && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/95 px-4">
              <div className="w-full max-w-sm rounded-2xl border border-teal-100 bg-white p-6 text-center shadow-xl">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Order placed successfully</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Your order has been placed successfully. Thank you for choosing Ultra Crackers.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-5 w-full rounded-md bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {step === "review" ? (
            <>
              {items.length === 0 ? (
                <p className="mt-10 text-center text-sm text-gray-500">Your cart is empty.</p>
              ) : (
                <ul className="mt-2 divide-y divide-gray-100">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 py-4">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-gray-100">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          ₹{item.price.toLocaleString("en-IN")} each
                        </p>

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
              <Field label="Name" error={errors.name}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`input ${errors.name ? "border-red-500" : ""}`}
                />
              </Field>

              <Field label="Mobile Number" error={errors.mobile}>
                <input
                  type="tel"
                  placeholder="Your Mobile Number"
                  value={form.mobile}
                  onChange={(e) => {
                    setForm({ ...form, mobile: e.target.value });
                    if (errors.mobile) setErrors({ ...errors, mobile: undefined });
                  }}
                  className={`input ${errors.mobile ? "border-red-500" : ""}`}
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`input ${errors.email ? "border-red-500" : ""}`}
                />
              </Field>

              <Field label="State" error={errors.state}>
                <select
                  value={form.state}
                  onChange={(e) => {
                    setForm({ ...form, state: e.target.value });
                    if (errors.state) setErrors({ ...errors, state: undefined });
                  }}
                  className={`input ${errors.state ? "border-red-500" : ""}`}
                >
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              {belowMinimum && <MinimumOrderNotice />}

              <Field label="City" error={errors.city}>
                <input
                  type="text"
                  placeholder="Your City"
                  value={form.city}
                  onChange={(e) => {
                    setForm({ ...form, city: e.target.value });
                    if (errors.city) setErrors({ ...errors, city: undefined });
                  }}
                  className={`input ${errors.city ? "border-red-500" : ""}`}
                />
              </Field>

              <Field label="Address" error={errors.address}>
                <textarea
                  placeholder="Your Address"
                  rows={3}
                  value={form.address}
                  onChange={(e) => {
                    setForm({ ...form, address: e.target.value });
                    if (errors.address) setErrors({ ...errors, address: undefined });
                  }}
                  className={`input resize-none ${errors.address ? "border-red-500" : ""}`}
                />
              </Field>

              <div className="mt-6 space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
                <SummaryRow label="Total" value={subtotal} />
                <SummaryRow label="Discount Total" value={discountTotal} />
                <SummaryRow label="Net Rate" value={netRate} />
                <SummaryRow
                  label={`Packing Charge (${packingChargePercent}%)`}
                  value={packingCharge}
                />
                <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-2 text-base font-semibold text-gray-900">
                  <span>Overall Total</span>
                  <span>₹{overallTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {submissionError ? (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {submissionError}
                </div>
              ) : null}

              {belowMinimum && <MinimumOrderNotice />}
            </div>
          )}
        </div>

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
                disabled={belowMinimum || isSubmitting}
                onClick={handleSubmit}
                className="flex-1 rounded-md bg-teal-600 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          )}
        </div>
      </div>

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

const Field: React.FC<{ label: string; children: React.ReactNode; error?: string }> = ({
  label,
  children,
  error,
}) => (
  <div>
    <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
    {children}
    {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
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