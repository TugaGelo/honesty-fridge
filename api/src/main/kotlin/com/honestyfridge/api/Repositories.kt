package com.honestyfridge.api

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

// Product Repository
interface ProductRepository : JpaRepository<Product, Long>

// Coworker Repository
interface CoworkerRepository : JpaRepository<Coworker, Long>

// Tab Entry Repository
interface TabEntryRepository : JpaRepository<TabEntry, Long> {
    fun findByCoworkerIdAndIsSettledFalse(coworkerId: Long): List<TabEntry>

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM TabEntry t WHERE t.isSettled = false")
    fun sumUnpaidTabs(): Double
}

// Expense Repository
interface ExpenseRepository : JpaRepository<Expense, Long> {
    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e")
    fun sumAllExpenses(): Double
}

// Cash Collection Repository
interface CashCollectionRepository : JpaRepository<CashCollection, Long> {
    @Query("SELECT COALESCE(SUM(c.amount), 0) FROM CashCollection c")
    fun sumAllCollections(): Double
}
