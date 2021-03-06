"use strict";
const uploadDir = "/images/";
module.exports = (sequelize, DataTypes) => {
  const Aduan_Hilang = sequelize.define(
    "Aduan_Hilang",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      judul_aduan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deskripsi_aduan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lokasi_aduan: {
        type: DataTypes.STRING,
        defaultValue: "-",
      },
      latitude: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      foto_barang: {
        type: DataTypes.STRING,
        defaultValue: "",
        get() {
          const image = this.getDataValue("foto_barang");
          return uploadDir + image;
        },
      },
      status_aduan: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "menunggu validasi satpam",
        validate: {
          isIn: {
            args: [
              [
                "menunggu validasi satpam",
                "menunggu validasi admin / kasubbag",
                "divalidasi",
              ],
            ],
            msg:
              "status aduan hanya tersedia 3 pilihan: menunggu validasi satpam, menunggu validasi admin/kasubbag dan sudah divalidasi",
          },
        },
      },
      kategori_aduan: {
        type: DataTypes.STRING,
        defaultValue: "Aduan barang hilang",
      },
    },
    {}
  );
  Aduan_Hilang.associate = function (models) {
    // associations can be defined here
    Aduan_Hilang.belongsTo(models.User);
  };
  return Aduan_Hilang;
};
