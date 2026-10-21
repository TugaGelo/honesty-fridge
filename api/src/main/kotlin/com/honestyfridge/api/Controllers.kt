package com.honestyfridge.api

import org.springframework.web.bind.annotation.*

// Data Transfer Objects (Incoming JSON Shapes)
data class TabRequest(val coworkerId: Long, val productId: Long)
data class ExpenseRequest(val description: String, val amount: Double, val productId: Long?, val quantityAdded: Int?)
data class CashCollectionRequest(val amount: Double, val note: String?)
data class ProductRequest(val name: String, val price: Double, val currentStock: Int, val lowStockThreshold: Int)
data class CoworkerRequest(val name: String)

// The API Endpoints
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["http://localhost:5173"])
class FridgeController(
    private val productRepo: ProductRepository,
    private val coworkerRepo: CoworkerRepository,
    private val tabRepo: TabEntryRepository,
    private val expenseRepo: ExpenseRepository,
    private val cashRepo: CashCollectionRepository
) {

    // Dashboard Stats
    @GetMapping("/dashboard/stats")
    fun getDashboardStats(): Map<String, Double> {
        val totalExpenses = expenseRepo.sumAllExpenses()
        val totalSettledTabs = tabRepo.findAll().filter { it.isSettled }.sumOf { it.amount }
        val totalCashCollected = cashRepo.sumAllCollections() + totalSettledTabs

        return mapOf(
            "totalExpenses" to totalExpenses,
            "totalCashIn" to totalCashCollected,
            "netProfit" to (totalCashCollected - totalExpenses),
            "totalUnpaidTabs" to tabRepo.sumUnpaidTabs()
        )
    }

    // Fetch all products
    @GetMapping("/products")
    fun getProducts(): List<Product> = productRepo.findAll()

    // Create a new product
    @PostMapping("/products")
    fun addProduct(@RequestBody request: ProductRequest): Product {
        val product = Product(
            name = request.name,
            price = request.price,
            currentStock = request.currentStock,
            lowStockThreshold = request.lowStockThreshold
        )
        return productRepo.save(product)
    }

    // Fetch all coworkers with their unpaid tabs
    @GetMapping("/coworkers")
    fun getCoworkers(): List<Map<String, Any>> {
        return coworkerRepo.findAll().map { coworker ->
            val unpaidTabs = tabRepo.findByCoworkerIdAndIsSettledFalse(coworker.id!!)
            val totalOwed = unpaidTabs.sumOf { it.amount }

            mapOf(
                "id" to coworker.id!!,
                "name" to coworker.name,
                "totalOwed" to totalOwed,
                "unpaidTabs" to unpaidTabs
            )
        }
    }

    // Create a new coworker
    @PostMapping("/coworkers")
    fun addCoworker(@RequestBody request: CoworkerRequest): Coworker {
        val coworker = Coworker(name = request.name)
        return coworkerRepo.save(coworker)
    }

    // Log an unpaid coffee on someone's tab
    @PostMapping("/tabs")
    fun addTabEntry(@RequestBody request: TabRequest): TabEntry {
        val product = productRepo.findById(request.productId)
            .orElseThrow { Exception("Product not found") }

        val entry = TabEntry(
            coworkerId = request.coworkerId,
            productId = product.id!!,
            productName = product.name,
            amount = product.price
        )
        return tabRepo.save(entry)
    }

    // Settle a coworker's tab (Pay debt)
    @PostMapping("/tabs/settle/{coworkerId}")
    fun settleTab(@PathVariable coworkerId: Long): Map<String, String> {
        val unpaidTabs = tabRepo.findByCoworkerIdAndIsSettledFalse(coworkerId)

        unpaidTabs.forEach { it.isSettled = true }
        tabRepo.saveAll(unpaidTabs)

        return mapOf("message" to "Successfully settled ${unpaidTabs.size} items.")
    }

    // Log Restock Expense
    @PostMapping("/expenses/restock")
    fun logRestock(@RequestBody request: ExpenseRequest): Expense {
        val expense = Expense(
            description = request.description,
            amount = request.amount,
            productId = request.productId,
            quantityAdded = request.quantityAdded
        )

        if (request.productId != null && request.quantityAdded != null) {
            val product = productRepo.findById(request.productId).orElse(null)
            if (product != null) {
                product.currentStock += request.quantityAdded
                productRepo.save(product)
            }
        }

        return expenseRepo.save(expense)
    }

    // Daily Cash Box Collection
    @PostMapping("/collections")
    fun collectCash(@RequestBody request: CashCollectionRequest): CashCollection {
        val collection = CashCollection(
            amount = request.amount,
            note = request.note
        )
        return cashRepo.save(collection)
    }
}
