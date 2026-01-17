-- Expense_Category definition

CREATE TABLE IF NOT EXISTS "Expense_Category" (
	"id_category"	INTEGER NOT NULL,
	"category"	TEXT NOT NULL,
	PRIMARY KEY("id_category" AUTOINCREMENT)
);


-- Payment_Type definition

CREATE TABLE IF NOT EXISTS "Payment_Type" (
	"id_payment_type"	INTEGER NOT NULL,
	"type"	INTEGER NOT NULL,
	PRIMARY KEY("id_payment_type" AUTOINCREMENT)
);


-- Risk definition

CREATE TABLE IF NOT EXISTS "Risk" (
	"id_risk"	INTEGER NOT NULL,
	"risk"	TEXT NOT NULL,
	PRIMARY KEY("id_risk" AUTOINCREMENT)
);


-- Type_Debt definition

CREATE TABLE IF NOT EXISTS "Type_Debt" (
	"id_type_debt"	INTEGER NOT NULL,
	"type"	INTEGER NOT NULL,
	PRIMARY KEY("id_type_debt" AUTOINCREMENT)
);


-- Type_Income definition

CREATE TABLE IF NOT EXISTS "Type_Income" (
	"id_type_income"	INTEGER NOT NULL,
	"type"	TEXT NOT NULL,
	PRIMARY KEY("id_type_income" AUTOINCREMENT)
);


-- Type_Investment definition

CREATE TABLE IF NOT EXISTS "Type_Investment" (
	"id_type_investment"	INTEGER NOT NULL,
	"type"	TEXT,
	PRIMARY KEY("id_type_investment" AUTOINCREMENT)
);


-- "User" definition

CREATE TABLE IF NOT EXISTS "User" (
	"id_user"	TEXT NOT NULL UNIQUE,
	"username"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	PRIMARY KEY("id_user")
);


-- Account definition

CREATE TABLE IF NOT EXISTS "Account" (
	"id_account"	INTEGER NOT NULL,
	"id_user"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"porcentage"	REAL NOT NULL DEFAULT 0,
	"amount"	REAL NOT NULL DEFAULT 0,
	"color"	TEXT NOT NULL,
	PRIMARY KEY("id_account" AUTOINCREMENT),
	FOREIGN KEY("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE
);


-- Debt definition

CREATE TABLE IF NOT EXISTS "Debt" (
	"id_debt"	INTEGER NOT NULL,
	"id_account"	INTEGER NOT NULL,
	"creditor"	TEXT NOT NULL,
	"paid"	INTEGER NOT NULL DEFAULT 0,
	"interestRate"	REAL NOT NULL DEFAULT 0,
	"start_date"	INTEGER NOT NULL,
	"end_date"	INTEGER NOT NULL,
	"total_amount"	REAL NOT NULL,
	"rest_amount"	REAL NOT NULL,
	"id_payment_type"	INTEGER NOT NULL,
	"id_type_debt"	INTEGER NOT NULL,
	PRIMARY KEY("id_debt" AUTOINCREMENT),
	FOREIGN KEY("id_account") REFERENCES "Account"("id_account") ON DELETE CASCADE,
	FOREIGN KEY("id_payment_type") REFERENCES "Payment_Type"("id_payment_type") ON DELETE CASCADE,
	FOREIGN KEY("id_type_debt") REFERENCES "Type_Debt"("id_type_debt") ON DELETE CASCADE
);


-- Expense definition

CREATE TABLE IF NOT EXISTS "Expense" (
	"id_expense"	INTEGER NOT NULL,
	"id_account"	INTEGER NOT NULL,
	"id_gasto_mensual"	INTEGER,
	"date"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"amount"	REAL NOT NULL DEFAULT 0,
	"id_category"	INTEGER NOT NULL,
	PRIMARY KEY("id_expense" AUTOINCREMENT),
	FOREIGN KEY("id_account") REFERENCES "Account"("id_account") ON DELETE CASCADE,
	FOREIGN KEY("id_category") REFERENCES "Expense_Category"("id_category") ON DELETE CASCADE
);


-- Income definition

CREATE TABLE IF NOT EXISTS "Income" (
	"id_income"	INTEGER NOT NULL,
	"date"	INTEGER NOT NULL,
	"description"	TEXT NOT NULL,
	"amount"	REAL NOT NULL DEFAULT 0,
	"id_type_income"	INTEGER NOT NULL,
	PRIMARY KEY("id_income" AUTOINCREMENT),
	FOREIGN KEY("id_type_income") REFERENCES "Type_Income"("id_type_income") ON DELETE CASCADE
);


-- Income_Account definition

CREATE TABLE IF NOT EXISTS "Income_Account" (
	"id"	INTEGER NOT NULL,
	"id_account"	INTEGER NOT NULL,
	"id_income"	INTEGER NOT NULL,
	"amount"	REAL NOT NULL DEFAULT 0,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("id_account") REFERENCES "Account"("id_account") ON DELETE CASCADE,
	FOREIGN KEY("id_income") REFERENCES "Income"("id_income") ON DELETE CASCADE
);


-- Investment definition

CREATE TABLE IF NOT EXISTS "Investment" (
	"id_investment"	INTEGER NOT NULL,
	"id_account"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"amount"	REAL NOT NULL DEFAULT 0,
	"expected_return"	REAL NOT NULL DEFAULT 0,
	"start_date"	INTEGER NOT NULL,
	"end_date"	INTEGER NOT NULL,
	"status"	TEXT NOT NULL,
	"id_risk"	INTEGER NOT NULL,
	"id_type_investment"	INTEGER NOT NULL,
	PRIMARY KEY("id_investment" AUTOINCREMENT),
	FOREIGN KEY("id_account") REFERENCES "Account"("id_account") ON DELETE CASCADE,
	FOREIGN KEY("id_risk") REFERENCES "Risk"("id_risk") ON DELETE CASCADE,
	FOREIGN KEY("id_type_investment") REFERENCES "Type_Investment"("id_type_investment") ON DELETE CASCADE
);


-- Monthly_Expense definition

CREATE TABLE IF NOT EXISTS "Monthly_Expense" (
	"id_monthly_expense"	INTEGER NOT NULL,
	"id_account"	INTEGER NOT NULL,
	"description"	TEXT NOT NULL,
	"payment_day"	INTEGER NOT NULL,
	"status"	TEXT NOT NULL,
	PRIMARY KEY("id_monthly_expense" AUTOINCREMENT),
	FOREIGN KEY("id_account") REFERENCES "Account"("id_account") ON DELETE CASCADE
);