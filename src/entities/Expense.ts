import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

export type ExpenseCategory = 'servicios' | 'energia' | 'funcionarios' | 'impuestos' | 'otros';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  description: string;

  // Categoría del gasto operativo
  @Column({ type: 'enum', enum: ['servicios', 'energia', 'funcionarios', 'impuestos', 'otros'], default: 'otros' })
  category: ExpenseCategory;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  amount: number;

  @Column({ type: 'date' })
  expense_date: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;
}