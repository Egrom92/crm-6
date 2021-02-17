import React, { useEffect, useState } from "react";
import { statuses } from "../../data";
import { NavLink } from "react-router-dom";
import {getDateValue} from '../../helpers'


import Table from "../../components/Table";

const statusClass = {
  new: "badge-primary",
  process: "badge-warning",
  back: "badge-danger",
  archived: "badge-dark"
};

export default function Orders(props) {
  const { orders, products } = props;

  const fields = [
    { label: "ID", name: "id" },
    { label: "ИФО", name: "fullname" },
    {
      label: "Заказ",
      render(order) {
        return products.find((x) => x.id === order.productId)?.name;
      }
    },
    {
      label: "Статус",
      render({ status }) {
        const statusData = statuses.find((x) => x.value === status);

        return (
          <span className={`badge ${statusClass[statusData.value]}`}>
            {statusData.name}
          </span>
        );
      }
    },
    {
      label: "Цена",
      render(order) {
        return products.find((x) => x.id === order.productId)?.price;
      }
    },
    {
      label: "Действия",
      render(order) {
        return (
          <NavLink
            to={`/order/${order.id}`}
            className="btn btn-outline-primary btn-sm"
          >
            Редактировать
          </NavLink>
        );
      }
    },
    {
      label: "Дата",
      render(order) {
        return getDateValue(order.createdAt)
      }
    }
  ];

  return (
    <Table className="table table-striped" fields={fields} items={orders} />
  );
}
