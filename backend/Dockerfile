FROM golang:1.26.8-alpine3.24 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o server .

FROM alpine:3.24.2

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=builder /app/server .

EXPOSE 8080

CMD ["./server"]
