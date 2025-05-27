import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function calculateInstallments(price: number, installments: number = 2): string {
  const interestRate = 0.5150; // 6.09% interest rate
  const monthlyRate = interestRate / 12; // Monthly interest rate
  
  // Calculate installment value with interest using the compound interest formula
  // PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  // where PMT = installment value, P = principal (price), r = monthly rate, n = number of installments
  const installmentValue = price * (monthlyRate * Math.pow(1 + monthlyRate, installments)) / (Math.pow(1 + monthlyRate, installments) - 1);
  
  return `${installments}x de ${formatCurrency(installmentValue)}`;
}