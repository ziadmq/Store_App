router.delete('/:id', async (req, res) => {
  try {
    // التحقق من الملكية في استعلام قاعدة البيانات (مطلب أساسي)
    const deletedItem = await Item.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.session.userId // لا يحذف إلا إذا كان المالك
    });

    if (!deletedItem) {
      return res.status(403).json({ message: "Not authorized or item not found" });
    }
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});