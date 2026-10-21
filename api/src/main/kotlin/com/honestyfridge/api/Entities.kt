package com.honestyfridge.api

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "products")
class Product(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    var name: String,
    var price: Double,
    var currentStock: Int = 0,
    var lowStockThreshold: Int = 5
)

@Entity
@Table(name = "coworkers")
class Coworker(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    var name: String
)

@Entity
@Table(name = "tab_entries")
class TabEntry(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val coworkerId: Long,
    val productId: Long,
    val productName: String,
    val amount: Double,
    var isSettled: Boolean = false,
    val createdAt: Instant = Instant.now()
)

@Entity
@Table(name = "expenses")
class Expense(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val description: String,
    val amount: Double,
    val productId: Long? = null,
    val quantityAdded: Int? = null,
    val createdAt: Instant = Instant.now()
)

@Entity
@Table(name = "cash_collections")
class CashCollection(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val amount: Double,
    val note: String? = null,
    val createdAt: Instant = Instant.now()
)
